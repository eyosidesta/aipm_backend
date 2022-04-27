const Sequelize = require('sequelize');
const db = require('../config/database');

const StaffMember = db.define('staffs', {
    name: {
        type: Sequelize.STRING,
    },
    gender: {
        type: Sequelize.STRING,
    },
    serviceTitle: {
        type: Sequelize.STRING,
    },
    place: {
        type: Sequelize.STRING,
    },
    ethiopianStaff: {
        type: Sequelize.BOOLEAN,
    },
    whoIsHe: {
        type: Sequelize.STRING,
    },
    responsibility: {
        type: Sequelize.STRING,
    },
    passion: {
        type: Sequelize.STRING,
    },
    imageUrl: {
        type: Sequelize.STRING,
    },
});

module.exports = StaffMember;