const express = require('express');

const router = express.Router();

// router.get('/', (req, res, next) => {
//     if(true) {
//         console.log("news guard before next");
//         next();
//         console.log("after next")
//     }
// });

const newsGuard = (req, res, next) => {
    console.log("before news");
    next();
    console.log("after news")
}

module.exports = newsGuard;