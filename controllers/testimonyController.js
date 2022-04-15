const Testimony = require('../models/Testimony');

exports.get_testimonies = (req, res) => {
    Testimony.findAll().then(testimonies => {
        res.status(200).json({
            message: "testimonies found successfully",
            response: {
                data: testimonies,
            }
        })
        console.log("all testimonies found");
    }).catch(err => {
        console.log("err found fetching testimonies", err);
    })
}

exports.get_testimony = (req, res) => {
    Testimony.findAll({
        where: {
            id: req.params.id
        }
    }).then(testimony => {
        res.status(200).json({
            message: "testimony found successfully",
            response: {
                data: testimony
            }
        })
    }).catch(err => {
        res.status(500).json({
            message: 'opps something went wrong ' + err
        })
    })
}

exports.update_testimony = (req, res) => {
    
}