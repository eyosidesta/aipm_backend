const express = require('express');
const router = express.Router();

const AuthController = require("../controllers/authController");

router.post("/login", AuthController.login);
router.post("/signUp", AuthController.sign_up);

module.exports = router;