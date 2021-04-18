const express = require("express");
const mysql = require("mysql");
const dotenv = require('dotenv');
const path = require('path');
const fileUpload = require("express-fileupload");


dotenv.config({
    path: './.env'
})

const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});


const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory))

app.use(express.urlencoded({
    extended: false
}));

app.use(express.json());
app.use(fileUpload());

app.set('view engine', 'hbs');


db.connect((error) => {
        if (error) {
            console.log(error)
        } else {
            console.log("DB connected")
        }
    })
    //upload











//Routes
app.use('/public', express.static(__dirname + '/public'))
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'))
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(__dirname + '/js'));
app.use('/public/upload', express.static(__dirname + '/public/upload'))



app.listen(5005, () => {
    console.log("Server started on Port 5005")
})