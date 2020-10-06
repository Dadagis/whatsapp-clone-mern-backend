const { request } = require("express");
const {
  Conversation,
  validateConversation,
} = require("../models/conversations");
const { User } = require("../models/user");

module.exports = {
  create: async (req, res) => {
    const { error } = validateConversation(req.body);

    if (error) {
      res
        .status(400)
        .send(
          `Expected ${error.details[0].message} ; was "${error.details[0].context.value}"`
        );
      return;
    }

    const data = req.body;
    let namesArray = [];
    const usersList = await User.find().where("_id").in(data.users);
    usersList.map((e) => {
      namesArray = [...namesArray, e.name];
    });

    const newConversation = new Conversation({
      users: req.body.users,
      usersNames: namesArray,
    });

    try {
      const result = await newConversation.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
    }
  },

  findByUserId: async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(400).send("No conversations found for the given user");
      return;
    }

    const conversations = await Conversation.find({
      users: { $in: [`${user._id}`] },
    });

    if (!conversations) {
      res.status(400).send("No conversations found for the given user");
      return;
    }

    console.log(conversations);

    try {
      res.send(conversations);
    } catch (error) {
      console.log(error);
    }
  },
};
