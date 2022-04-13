const Sequelize = require('sequelize');
const db = require('../config/database');

const PrayerMovement = db.define('prayers', {
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

module.exports = PrayerMovement;