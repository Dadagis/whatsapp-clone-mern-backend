require("dotenv").config();
const helmet = require("helmet");
const express = require("express");
const mongoose = require("mongoose");
const { Message } = require("./models/message");
const Pusher = require("pusher");

mongoose
  .connect(`${process.env.DB_CREDENTIALS}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to MongoDb"));

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.use(helmet());
const port = process.env.PORT || 4000;

const pusher = new Pusher({
  appId: "1071379",
  key: "dbb1d6a74095b5cc4f07",
  secret: "283118eb736fa6b122b5",
  cluster: "eu",
  encrypted: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("db connected");

  const messageCollection = db.collection("messages");
  const changeStream = messageCollection.watch();

  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        _id: messageDetails._id,
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.createdAt,
        received: messageDetails.received,
      });
    } else {
      console.log("Pusher error");
    }
  });
});

const server = app.listen(port, () => console.log(`Listening on port ${port}`));

app.post("/api/messages", async (req, res) => {
  const newMessage = new Message({
    message: req.body.message,
    name: req.body.name,
    received: req.body.received,
  });

  try {
    const result = await newMessage.save();
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
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
