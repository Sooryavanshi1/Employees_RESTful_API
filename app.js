const express = require("express")

const app = express();

require('./initialize.Database')()

app.listen(3000,()=>{
    console.log("server has started on port 3000");
})