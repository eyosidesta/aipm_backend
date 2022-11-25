const Admin = require("../models/Admin");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const response = require("../utils/responses");
const sucessMessage = require("../utils/success_messages");
const errorMessage = require("../utils/error_messages");

exports.login = async (req, res) => {
  const admin = Admin.findAll({
    email: req.body.email,
  });

  if (admin == null) {
    return res.status(400).send("Can not find admin");
  }
  try {
    if (await bcrypt.compare(req.body.password, admin.password)) {
      jwt.sign({admin}, 'secretkey', (err, token) => {
        if(err) {
          res.sendStatus(500).json("there is something error");
        } else {
          res.json({
            token
          })
        }
        
      })
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
    const admin = {fullName: req.body.fullName, phone: req.body.phone, email: req.body.email, role: req.body.role, gender: req.body.gender, staffLocation: req.body.staffLocation, aipmService: req.body.aipmService, password: hashedPassword };
    const newAdmin = await Admin.create({
      fullName: admin.fullName,
      phone: admin.phone,
      email: admin.email,
      role: admin.role,
      gender: admin.gender,
      staffLocation: admin.staffLocation,
      aipmService: admin.aipmService,
      password: admin.password,
    });

    newAdmin
      .then((createdAdmin) => {
        res
          .status(201)
          .json(
            response.success_response(
              sucessMessage.updated_message("New Admin"),
              201,
              createdAdmin
            )
          );
      })
      .catch((err) => {
        res
          .status(500)
          .json(
            response.failure_response(
              errorMessage.added_error("New Admin"),
              500,
              err
            )
          );
      });
  } catch {
    res.send(500).send();
  }
};
