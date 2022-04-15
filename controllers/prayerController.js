const PrayerMovement = require('../models/PrayerMovement');

exports.get_all_prayer_movements = (req, res) => {
    PrayerMovement.findAll().then(prayers => {
        res.status(200).json({
            status: true,
            code: 200,
            message: "",
        }).catch(err => {
            res.status(500).json({
                status: false,
                code: 500,
                message: err,
            })
        })
    })
}