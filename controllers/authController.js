const User = require("../models/User");
const bcrypt = require('bcrypt');
const response = require("../utils/responses");
const sucessMessage = require("../utils/success_messages");
const errorMessage = require("../utils/error_messages");

exports.login = async (req, res) => {
  const user = User.findAll({
    username: req.body.username,
  });

  if (user == null) {
    return res.status(400).send("Can not find user");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.status(200).send("loged in successfully");
    }
  } catch (err) {
    res.status(500).send();
  }
};

exports.sign_up = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = {fullName: req.body.fullName, phone: req.body.phone, username: req.body.username, password: hashedPassword };
    const newUser = await User.create({
      username: user.username,
      password: user.password,
    });

    newUser
      .then((createdUser) => {
        res
          .status(201)
          .json(
            response.success_response(
              sucessMessage.updated_message("New User"),
              201,
              createdUser
            )
          );
      })
      .catch((err) => {
        res
          .status(500)
          .json(
            response.failure_response(
              errorMessage.added_error("New User"),
              500,
              err
            )
          );
      });
  } catch {
    res.send(500).send();
  }
};
