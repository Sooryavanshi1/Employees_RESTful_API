const express = require("express")

const app = express();

app.use(express.json());

require('./initialize.Database')()

const employeeRoute = require('./Routes/employee.Routes');

app.use('/employee',employeeRoute);

app.use((req,res,next)=>{
    next(createError(404,'Not Found'));
});

app.use((err,req,res,next)=>{
    res.status(err.status || 500)
    res.send({
        error:{
            status:err.status || 500,
            message:err.message
        }
    });
});

app.listen(3000,()=>{
    console.log("server has started on port 3000");
})