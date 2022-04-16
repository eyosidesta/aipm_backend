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
  uid = req.params.id;
  const staff = await StaffMember.findByPk(uid);
  if (staff === null) {
    res
      .status(404)
      .json(
        response.failure_response(
          errorMessage.error_404("Staff Member"),
          404,
          null
        )
      );
    return;
  }
  staff
    .then((staff_member) => {
      res
        .status(200)
        .json(
          response.success_response(
            sucessMessage.found_by_id_message("Staff Member"),
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
            errorMessage.found_by_id_error("Staff Members", uid),
            500,
            err
          )
        );
    });
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

  newStaff
    .then((createdStaff) => {
      res
        .status(201)
        .json(
          response.success_response(
            sucessMessage.updated_message("Staff Member"),
            201,
            createdStaff
          )
        );
    })
    .catch((err) => {
      res
        .status(500)
        .json(
          response.failure_response(
            errorMessage.added_error("Staff Members"),
            500,
            err
          )
        );
    });
};

exports.update_staff_member = (req, res) => {
  const updatedStaff = {};
  for (const ops of req.body) {
    updatedStaff[ops.propName] = ops.value;
  }
  StaffMember.update({ _id: req.params.id }, { $set: updatedStaff })
    .exec()
    .then((staff) => {
      res
        .status(200)
        .json(
          response.success_response(
            sucessMessage.updated_message("Staff Member"),
            200,
            staff
          )
        );
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        code: 500,
        message: `error found ${err}`,
      });
    });
  // const updatedStaff = StaffMember.update({
  //     name: req.body.name,
  //     gender: req.body.gender,
  //     serviceTitle: req.body.serviceTitle,
  //     place: req.body.place,
  //     ethiopianStaff: req.body.ethiopianStaff,
  //     whoIsHe: req.body.whoIsHe,
  //     responsibility: req.body.responsibility,
  //     passion: req.body.passion,
  //     imageUrl: req.body.imageUrl,
  // }, where({
  //     _id: req.body.id
  // }))

  //   updatedStaff;
};

exports.delete_staff_member = async (req, res) => {
  const uid = req.params.id;
  if (!uid) {
    res.status(404).json({
      status: false,
      code: 404,
      message: "staff member is not found",
    });
    return;
  }

  const staff_member = await StaffMember.findByPk(uid);
  if(!staff_member) {
    res.status(404).json(response.failure_response(errorMessage.error_404("Staff Member"), 404, null))
  }
  
  StaffMember.destroy({
    where: {
      id: uid,
    },
  })
    .then((staff) => {
      res
        .status(200)
        .json(
          response.success_response(
            sucessMessage.deleted_message("Staff Member"),
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
            errorMessage.added_error("Staff Member"),
            500,
            err
          )
        );
    });
};
