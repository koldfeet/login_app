// const dotenv = require("dotenv");
require("dotenv").config();

module.exports = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
};