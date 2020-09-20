const Auth = require("../controllers/auth_controller");
const express = require("express");
const router = express.Router();

router.post("/login", Auth.login);

module.exports = router;
