const auth = require("../middlewares/auth");
const Message = require("../controller/");
const express = require("express");
const router = express.Router();

router.get("/sync", auth, Message.getAllMessages);
router.post("/", auth, Message.create);
