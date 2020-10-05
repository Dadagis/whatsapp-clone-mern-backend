const auth = require("../middlewares/auth");
const express = require("express");
const router = express.Router();

router.get("/", auth);
router.post("/", auth);

module.exports = router;
