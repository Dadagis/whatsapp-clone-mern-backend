require("dotenv").config();
const helmet = require("helmet");
const express = require("express");
const mongoose = require("mongoose");
const { Message } = require("./models/message");

mongoose
  .connect(`${process.env.DB_CREDENTIALS}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to MongoDb"));

const app = express();
app.use(express.json());
app.use(helmet());
const port = process.env.PORT || 4000;

const server = app.listen(port, () => console.log(`Listening on port ${port}`));

app.post("/api/messages", async (req, res) => {
  const newMessage = new Message({
    message: req.body.message,
    name: req.body.name,
  });

  try {
    const result = await newMessage.save();
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }

  //   Message.create(message, (err, data) => {
  //     if (err) {
  //       res.status(500).send(err);
  //     } else {
  //       res.status(201).send(data);
  //     }
  //   });
});

app.get("/api/messages/sync", (req, res) => {
  Message.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
