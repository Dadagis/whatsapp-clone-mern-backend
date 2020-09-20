const express = require("express");
const auth = require("../routes/auth");
const messages = require("../routes/messages");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/auth", auth);
  app.use("/api/messages", messages);
};
