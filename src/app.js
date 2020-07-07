const express = require("express");
const { connection } = require("./database/db");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();
connection();

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

app.set("view engine","hbs");

app.use("/",require('./routes/pages'));
app.use("/auth",require("./routes/auth"));

 app.listen(3333,() => {

    console.log("Server started in localhost:3333");

 });


