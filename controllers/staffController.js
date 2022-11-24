const StaffMember = require("../models/StaffMember");
const response = require("../utils/responses");
const sucessMessage = require("../utils/success_messages");
const errorMessage = require("../utils/error_messages");

exports.get_all_staff_members = (req, res) => {
  StaffMember.findAll()
    .then((staff) => {
      res
        .status(200)
        .json(
          response.success_response(
            sucessMessage.found_message("Staff Member"),
            200,
            staff
          )
        );
    })
    .catch((err) => {
      res
        .status(500)
        .json(
          response.failure_response(
            errorMessage.found_error("Staff Members"),
            500,
            err
          )
        );
    });
};

exports.get_staff_member_by_id = async (req, res) => {
  const uid = req.params.id;
  const convertedToNum = parseInt(uid);
  if (isNaN(convertedToNum)) {
    res.status(400).json({
      message: 'the parameter is not an integer, please provide the actual integer value for the id',
    })
    return
  }
  if (!uid) {
    res.status(404).json({
      status: false,
      code: 404,
      message: "staff member is not found",
    });
    return;
  }
  const staff_member = await StaffMember.findByPk(convertedToNum);
  if (!staff_member) {
    res.status(404).json(response.failure_response(errorMessage.error_404("Staff Member"), 404, null))
    return;
  }
  res.status(200).json(response.success_response(sucessMessage.found_by_id_message('Staff Member', convertedToNum), 200, staff_member))
  return;
};

exports.add_staff_member = async (req, res) => {
  const newStaff = await StaffMember.create({
    name: req.body.name,
    gender: req.body.gender,
    serviceTitle: req.body.serviceTitle,
    place: req.body.place,
    ethiopianStaff: req.body.ethiopianStaff,
    whoIsHe: req.body.whoIsHe,
    responsibility: req.body.responsibility,
    passion: req.body.passion,
    imageUrl: req.body.imageUrl,
  });

  if (newStaff) {
    res
      .status(201)
      .json(
        response.success_response(
          sucessMessage.updated_message("Staff Member"),
          201,
          newStaff
        )
      );
  } else {
    res
      .status(500)
      .json(
        response.failure_response(
          errorMessage.added_error("Staff Members"),
          500,
          err
        )
      );
  }
};

exports.update_staff_member = async (req, res) => {
  const uid = req.params.id;
  const convertedToNum = parseInt(uid);
  if (isNaN(convertedToNum)) {
    res.status(400).json({
      message: 'the parameter is not an integer, please provide the actual integer value for the id',
    })
    return
  }
  if (!uid) {
    res.status(404).json({
      status: false,
      code: 404,
      message: "staff member is not found",
    });
    return;
  }
  const staff_member = await StaffMember.findByPk(convertedToNum);
  if (!staff_member) {
    res.status(404).json(response.failure_response(errorMessage.error_404("Staff Member"), 404, null))
    return;
  }
  const update_staff_member = {};
  const inputValue = req.body;
  const keys = Object.keys(inputValue);

  keys.forEach(items => {
    update_staff_member[items] = inputValue[items]
  })
  StaffMember.update({
    name: update_staff_member.name,
    gender: update_staff_member.gender,
    serviceTitle: update_staff_member.serviceTitle,
    place: update_staff_member.place,
    ethiopianStaff: update_staff_member.ethiopianStaff,
    whoIsHe: update_staff_member.whoIsHe,
    responsibility: update_staff_member.responsibility,
    passion: update_staff_member.passion,
    imageUrl: update_staff_member.imageUrl,
  }, {
    where: {
      id: convertedToNum,
    }
  }).then((staffmember) => {
    res
      .status(201)
      .json(
        response.success_response(
          sucessMessage.updated_message("Staff Member"),
          201,
          update_staff_member
        )
      );
  }).catch((err) => {
    res.status(500).json({
      status: false,
      code: 500,
      message: `error found ${err}`,
    });
  });
};

exports.delete_staff_member = async (req, res) => {
  const uid = req.params.id;
  const convertedToNum = parseInt(uid);
  if (isNaN(convertedToNum)) {
    res.status(400).json({
      error: 'the parameter is not an integer, please provide the actual integer value for the id',
    })
    return
  }
  if (!uid) {
    res.status(404).json({
      status: false,
      code: 404,
      error: "staff member is not found",
    });
    return;
  }

  const staff_member = await StaffMember.findByPk(convertedToNum);
  if (!staff_member) {
    res.status(404).json(response.failure_response(errorMessage.error_404("Staff Member"), 404, null))
    return;
  }

  StaffMember.destroy({
    where: {
      id: convertedToNum,
    },
  })
    .then((staffValue) => {
      res
        .status(200)
        .json(
          response.success_response(
            sucessMessage.deleted_message("Staff Member"),
            200,
            staff_member
          )
        );
    })
    .catch((err) => {
      res
        .status(500)
        .json(
          response.failure_response(
            errorMessage.added_error("Staff Member"),
            500,
            err
          )
        );
    });
};
