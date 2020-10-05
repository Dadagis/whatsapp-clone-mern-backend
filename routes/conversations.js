const auth = require("../middlewares/auth");
const express = require("express");
const Conversation = require("../controllers/conversations_controller");
const router = express.Router();

router.get("/", auth, Conversation.findByUserId);
router.post("/", auth, Conversation.create);

module.exports = router;
