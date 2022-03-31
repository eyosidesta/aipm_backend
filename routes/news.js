const express = require('express');
const router = express.Router();

const newsGuard = require('../guards/news.guard');

router.get("/", newsGuard,(req, res) => {
    console.log("news here")
    res.send("news")
});

router.post("/", (req, res) => {

});

router.put("/:id", (req, res) => {

});

router.delete("/:id", (req, res) => {

})

module.exports = router;