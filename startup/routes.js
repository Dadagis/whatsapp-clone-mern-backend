const express = require("express");
const auth = require("../routes/auth");
const users = require("../routes/users");
const messages = require("../routes/messages");
const conversations = require("../routes/conversations");
const cors = require("cors");

const corsOptions = {
  exposedHeaders: "x-auth-token",
};

module.exports = function (app) {
  app.use(express.json());
  app.use(cors(corsOptions));
  app.use("/api/auth", auth);
  app.use("/api/users", users);
  app.use("/api/messages", messages);
  app.use("/api/conversations", conversations);
};
