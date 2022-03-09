const Sequelize = require('sequelize');
require('dotenv').config({ path: './config/.env' })
const dbConfig = {
    HOST: "localhost",
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DB: "groupomaniav2",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
}

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('../models/user')(sequelize, Sequelize);
db.posts = require('../models/post')(sequelize, Sequelize);

module.exports = db;