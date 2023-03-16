// const { Sequelize } = require("sequelize");
const Sequelize = require("sequelize");
const db = require("../config/database");

const Admin = db.define("admins", {
    fullName: {
        type: Sequelize.STRING,
    },
    phone: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    role: {
        type: Sequelize.STRING,
    },
    gender: {
        type: Sequelize.STRING,
    },
    staffLocation: {
        type: Sequelize.STRING,
    },
    aipmService: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    }
})

module.exports = Admin;