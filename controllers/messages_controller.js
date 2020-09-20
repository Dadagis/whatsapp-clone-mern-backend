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
};
