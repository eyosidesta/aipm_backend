require('dotenv').config()
const jwt = require('jsonwebtoken')

const isAdminLogged = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    next();
    return;

    if (token == null) return res.sendStatus(401)
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user;
        next(); 
    })
}

module.exports = isAdminLogged;