const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("staff mebmers get");
});

router.post('/', (req, res) => {
    res.send("staff members post");
});

router.put("/", (req, res) => {
    res.send("staff members put");
});

router.delete("/", (req, res) => {
    res.send("staff members delete");
});

module.exports = router;