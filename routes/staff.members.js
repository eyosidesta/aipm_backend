const express = require('express');
const router = express.Router();
const isAdminLogged = require("../guard/admin.login.guard");

router.get("/", (req, res) => {
    res.send("staff mebmers get");
});

router.post('/', isAdminLogged, (req, res) => {
    res.send("staff members post");
});

router.route("/:id").get((req, res) => {
    res.send(`get staff members by id: ${req.params.id}`);
}).put(isAdminLogged, (req, res) => {
    res.send(`staff members put ${req.params.id}`);
}).delete(isAdminLogged, (req, res) => {
    res.send(`staff members delete ${id}`);
})

module.exports = router;