const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, validateUser } = require("../models/user");

module.exports = {
  me: async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
  },

  create: async (req, res) => {
    const { error } = validateUser(req.body);

    if (error) {
      res
        .status(400)
        .send(
          `Expected ${error.details[0].message} ; was "${error.details[0].context.value}"`
        );
      return;
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered");

    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const token = user.generateAuthToken();

    try {
      await user.save();
      res
        .header("x-auth-token", token)
        .send(_.pick(user, ["id", "name", "email"]));
    } catch (error) {
      console.log(error.message);
    }
  },
};
