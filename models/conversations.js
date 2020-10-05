const mongoose = require("mongoose");
const Joi = require("joi");

const conversationSchema = new mongoose.Schema(
  {
    users: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

const validateConversation = (conversation) => {
  const schema = Joi.object({
    users: Joi.array().items(Joi.string().required(), Joi.string().required()),
  });

  return schema.validate(conversation);
};

exports.Conversation = Conversation;
exports.validateConversation = validateConversation;
