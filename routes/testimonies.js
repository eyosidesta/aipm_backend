const express = require('express');
const router = express.Router();
const isAdminLogged = require("../guard/admin.login.guard");

router.get("/", (req, res) => {
    res.send("testimonies get");
});

router.post("/", isAdminLogged, (req, res) => {
    res.send("testimonies post");
});

router.route("/:id").get((req, res) => {
    res.send(`get testimonies by id: ${req.params.id}`);
}).put(isAdminLogged, (req, res) => {
    res.send(`testimonies put ${req.params.id}`);
}).delete(isAdminLogged, (req, res) => {
    res.send(`testimonies delete ${req.params.id}`);
})

module.exports = router;