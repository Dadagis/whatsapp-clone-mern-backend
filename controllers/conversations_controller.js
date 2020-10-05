const {
  Conversation,
  validateConversation,
} = require("../models/conversations");

module.exports = {
  create: (req, res) => {
    const { error } = validateConversation(req.body);

    if (error) {
      res
        .status(400)
        .send(
          `Expected ${error.details[0].message} ; was "${error.details[0].context.value}"`
        );
      return;
    }

    const newConversation = new Conversation({ users: req.body.users });

    try {
        const result = await newConversation.save()
        res.send(result)
    } catch (error) {
        console.log(error.message)
    }
  },

  findByUserId: (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        res
          .status(400)
          .send(
            "No conversations found for the given user"
          );
        return;
      }

      const conversations = await Conversation.find({users: {"$in" : [`${user._id}`]}})

      if (!conversations) {
        res
          .status(400)
          .send(
            "No conversations found for the given user"
          );
        return;
      }

      try {
          res.send(conversations)
      } catch (error) {
          console.log(error)
      }
  }
};
