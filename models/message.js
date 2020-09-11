const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    message: String,
    name: String,
    received: Boolean,
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

exports.Message = Message;
