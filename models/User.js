// const { Sequelize } = require("sequelize");
const Sequelize = require("sequelize");
const db = require("../config/database");

const User = db.define("auth", {
    fullName: {
        type: Sequelize.STRING,
    },
    phone: {
        type: Sequelize.STRING,
    },
    username: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.password,
    }
})

module.exports = Authentication;