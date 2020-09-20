const Auth = require("../controllers/auth_controller");
const express = require("express");
const router = express.Router();

router.post("/", Auth.login);

module.exports = router;
