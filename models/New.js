const Sequelize = require('sequelize');
const db = require('../config/database');

const New = db.define('news', {
    title: {
        type: Sequelize.STRING,
    },
    detail: {
        type: Sequelize.STRING,
    },
    imageUrl: {
        type: Sequelize.STRING,
    },
});

module.exports = New;