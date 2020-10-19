const auth = require("../middlewares/auth");
const User = require("../controllers/users_controller");
const express = require("express");
const router = express.Router();

router.get("/me", auth, User.me);
router.get("/", auth, User.all);
router.post("/", User.create);

module.exports = router;
