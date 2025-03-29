const express=require('express');
const app=express();
const connectdb=require('./config.js/db');
const router=require('./router/user-router');
app.use(express.urlencoded({extended:false}));
app.use(express.json());
require("dotenv").config();
const cors=require("cors");

const corsOptions={
    origin:"http://localhost:5173",
    method:"GET,POST,PUT,PATCH,DELETE",
    Credentials:true
}
app.use(cors(corsOptions));



app.use('/api',router);
connectdb();
app.listen(8000,()=>console.log("Server has been started."));
