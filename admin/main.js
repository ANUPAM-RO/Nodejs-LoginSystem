const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
// var path = require('path');
const express = require('express');
const app = express();
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
dotenv.config({path:'./config.env'});
require('./router/connection');
const User = require('./model/userSchema');
const PORT = process.env.PORT;

app.use(express.urlencoded({extended:false}));
app.use(express.json())

app.use(require('./router/auth'));
app.listen(PORT,()=>{
    console.log(`server is running at port no ${PORT}`)
});

