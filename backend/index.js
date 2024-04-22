const express = require('express')
var cors = require('cors');
const connection=require('./connection');

const appuserRoute = require('./routes/appuser');


const app= express();
app.use(cors());

//express json is used for parsing incoming req data from HTTP req
app.use(express.json());

app.use('/appuser',appuserRoute);
module.exports=app;