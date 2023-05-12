require('dotenv').config()
const express = require('express');
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const app = express();
const connection = require('./db')
const userRoutes = require('./routes/user')
const authRoutes = require('./routes/auth')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


//For Image Uploading
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    extended: false,
    limit: '50mb'
}));
app.use("/public", express.static(path.join(__dirname, "public")));



//Routes

app.use("/users", userRoutes)
app.use("/auth", authRoutes)






//Database connection with mongodb
connection()


//Running Server Port
app.listen(7000, function () {
    console.log('Listening to Port 7000');
});
