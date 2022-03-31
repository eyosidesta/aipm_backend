const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("testimonies get page");
});

router.post("/", (req, res) => {
    res.send("testimonies post page");
});

router.put("/:id", (req, res) => {

});

router.delete("/:id", (req, res) => {
});

module.exports = router