const { Message } = require("../models/message");

module.exports = {
  getAllMessages: (req, res) => {
    Message.find((err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  },

  create: async (req, res) => {
    const newMessage = new Message({
      message: req.body.message,
      name: req.body.name,
      emitter: req.body.emitter,
    });

    try {
      const result = await newMessage.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
    }
  },
};
