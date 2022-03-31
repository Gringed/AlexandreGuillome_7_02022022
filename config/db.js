const Sequelize = require('sequelize');
require('dotenv').config({ path: './config/.env' })
const dbConfig = {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DBNAME: process.env.DB_DBNAME,
    DB_PORT: process.env.DB_PORT,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
}

const sequelize = new Sequelize(dbConfig.DB_DBNAME, dbConfig.DB_USER, dbConfig.DB_PASSWORD, {
    host: dbConfig.DB_HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    port: dbConfig.DB_PORT,
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
db.likes = require('../models/likes')(sequelize, Sequelize);
db.comments = require('../models/comments')(sequelize, Sequelize);

module.exports = db;