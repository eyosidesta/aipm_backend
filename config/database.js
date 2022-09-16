const Sequelize = require('sequelize');
const db_password = require('./db-constant');

module.exports = new Sequelize('aipm', 'postgres', `${db_password}`, {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0, 
        acquire: 30000,
        idle: 10000,
    },
});

