const auth = require("../middlewares/auth");
const Message = require("../controllers/messages_controller");
const express = require("express");
const router = express.Router();

router.get("/sync", auth, Message.getAllMessages);
router.get("/:id", auth, Message.getMessagesByConvId);
router.post("/", auth, Message.create);

module.exports = router;
