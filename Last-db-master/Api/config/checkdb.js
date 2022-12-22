//check database
const config = require("./config.json");
const mysql = require("mysql2/promise");
const {Sequelize} = require("sequelize");
const db = require("../models");

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
