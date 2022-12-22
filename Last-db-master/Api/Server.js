require('rootpath')();
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const initRouter = require("./route/Router");
const config = require("./config/config.json");
const {Sequelize} = require("sequelize");
const mysql = require("mysql2/promise");
const db = require("./models");
const app = express();
app.use(express.json());
const cookieParser = require('cookie-parser');
app.use(express.urlencoded({extended: true}));
require("dotenv").config();

app.use(
    cors({
        credentials: true,
        origin: (_, callback) => callback(null, true),
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        optionsSuccessStatus: 200,
    }),
);
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

createdb().then(r => r)

// simple route
app.get("/", (req, res) => {
    res.json({message: "Welcome to BE application."});
});

// api routes
initRouter(app);

// global error handler

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));

//check database
async function createdb() {
    // create db if it doesn't already exist
    const {host, port, user, password, database} = config.development;
    const connection = await mysql.createConnection({host, port, user, password});
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    // connect to db
    const sequelize = new Sequelize(database, user, password, {dialect: 'mysql'});
    await sequelize.sync({alter: true});
    db.sequelize.sync({alter: true})
        .then(() => {
            console.log("Synced database check is complete");
        })
}
