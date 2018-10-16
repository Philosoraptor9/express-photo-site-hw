const mongoose = require('mongoose');

const connectionString = "mongodb://localhost/photoblog";

mongoose.connect(connectionString, { useNewUrlParser: true});

mongoose.connection.on('connected', ()=>{
    console.log(`mongoose is connected to ${connectionString}`);
})

mongoose.connection.on('disconnected', ()=>{
    console.log("mongoose is disconnected");
})

mongoose.connection.on('error', (err)=>{
    console.log("mongoose error is");
    console.log(err)
})