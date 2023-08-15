const mongoose = require('mongoose')

module.exports = ()=>{
    mongoose.connect("mongodb://0.0.0.0:27017")
    .then(()=>{
        console.log("mongodb is connected");
    })
    .catch(err=>console.log(err.message));

    mongoose.connection.on('connected',()=>{
        console.log('Mongoose is connected to Database');
    });
    mongoose.connection.on('error',(err)=>{
        console.log(err.message);
    });
    mongoose.connection.on('disconnected',()=>{
        console.log('mongoose connection is disconnected');
    });
    process.on('SIGINT',()=>{
        console.log('Mongoose Disconnected on app termination');
        process.exit(0);
    })
};