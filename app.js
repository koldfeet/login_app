const express = require("express");
const mysql = require("mysql");
const path = require("path")
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser")
const { flatten } = require("express/lib/utils");
dotenv.config({ path: "./.env" })
const app = express();

//connecting to database start ========
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

// parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }))
// parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cookieParser());

//start view engine for hbs to show html
app.set("view engine", "hbs");

db.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("MYSQL Connected...")
    };
});
//connecting to database end ========


//ROUTES ===========================
//Define Routes
app.use("/", require("./routes/pages"))
app.use("/auth", require("./routes/auth"))


app.listen(5000, () => {
    console.log("Server started on Port 5000")
})