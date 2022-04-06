const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("prayer movement get");
});

router.post("/", (req, res) => {
    res.send("prayer movement post");
});

router.put("/", (req, res) => {
    res.send("prayer movement put");
});

router.delete("/", (req, res) => {
    res.send("prayer movement delete")
});

module.exports = router;