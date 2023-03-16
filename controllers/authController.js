const Admin = require("../models/Admin");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const response = require("../utils/responses");
const sucessMessage = require("../utils/success_messages");
const errorMessage = require("../utils/error_messages");

exports.login = async (req, res) => {
  const admin = await Admin.findAll({
    where: {
      email: req.body.email,
    }
  });

  if (admin.length <= 0) {
    return res.status(403).send("the password or email is incorrect");
  }
  try {
    if(await bcrypt.compare(req.body.password, admin[0].password)) {
      jwt.sign({admin}, 'secretkey', (err, token) => {
        if (err) {
          res.status(403).json("there is something error");
        } else {
          res.status(200).json({
            admin: admin[0],
            token
          })
        }
      })
    } else {
      res.sendStatus(403)
    }
  } catch(err) {
    res.status(500).json({
      err: 'something went wrong'
    })
  }
};

exports.sign_up = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash('password', salt);
    const admin = { fullName: req.body.fullName, phone: req.body.phone, email: req.body.email, role: req.body.role, gender: req.body.gender, staffLocation: req.body.staffLocation, aipmService: req.body.aipmService, password: hashedPassword };
    const checkEmailExist = await Admin.findAll({
      where: {
        email: req.body.email
      }
    })
    if (checkEmailExist.length > 0) {
      // 409 code for conflict
      res.status(409).json({
        message: `Email already exists, ${checkEmailExist[0].fullName} registered with ${checkEmailExist[0].email}`
      })

    } else {

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

      if (newAdmin) {
        res
          .status(201)
          .json(
            response.success_response(
              sucessMessage.updated_message("New Admin"),
              201,
              newAdmin
            )
          );
      } else {
        res
          .status(500)
          .json(
            response.failure_response(
              errorMessage.added_error("New Admin"),
              500,
              err
            )
          );
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
