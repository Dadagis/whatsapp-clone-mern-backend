const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    message: String,
    name: String,
    emitter: String,
    conversation: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

exports.Message = Message;
