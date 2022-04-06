const express = require('express');
const router = express.Router();
const isAdminLogged = require("../guard/admin.login.guard");

isAdminLogged;
router.get("/", (req, res) => {
    res.send("news get");
});

router.post("/", (req, res) => {
    res.send("news post");
});

router.put("/", (req, res) => {
    res.send("news put");
});

router.delete("/", (req, res) => {
    res.send("news delete");
});

module.exports = router;