const path = require('path');
const dotenv = require('dotenv');

const envPath = path.resolve(__dirname, ".env");
dotenv.config({path: envPath});

const {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PW,
    MYSQL_DB
} = process.env;

const options = {
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PW,
    database: MYSQL_DB,
    connectionLimit: 30
};

module.exports = options;