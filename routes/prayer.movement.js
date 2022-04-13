const express = require('express');
const router = express.Router();
const isAdminLogged = require("../guard/admin.login.guard");

router.get("/", (req, res) => {
    res.send("prayer movement get");
});

router.post("/", isAdminLogged, (req, res) => {
    res.send("prayer movement post");
});

router.route("/:id").get((req, res) => {
    res.send(`prayer get by id: ${req.params.id}`);
}).put(isAdminLogged, (req, res) => {
    res.send(`prayer movement put ${req.params.id}`);
}).delete(isAdminLogged, (req, res) => {
    res.send(`prayer movement delete ${req.params.id}`);
})


module.exports = router;