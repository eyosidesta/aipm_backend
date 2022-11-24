const Sequelize = require('sequelize');
const db = require('../config/database');

const Testimony = db.define('testimonies', {
    name: {
        type: Sequelize.STRING,
    },
    servicePlace: {
        type: Sequelize.STRING,
    },
    specialThing: {
        type: Sequelize.STRING,
    },
    action: {
        type: Sequelize.STRING,
    },
    descriptionOne: {
        type: Sequelize.STRING,
    },
    descriptionTwo: {
        type: Sequelize.STRING,
    },
    imageUrl: {
        type: Sequelize.STRING
    }
});

module.exports = Testimony;