const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    message: String,
    name: String,
    emitter: String,
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

exports.Message = Message;
