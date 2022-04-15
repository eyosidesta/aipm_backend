const StaffMember = require("../models/StaffMember");

exports.get_all_staff_members = (req, res) => {
  StaffMember.findAll()
    .then((staff) => {
      res.status(200).json({
        status: true,
        code: 200,
        message: "staff members found successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        code: 500,
        message: `error found ${err}`,
      });
    });
};

exports.get_staff_member_by_id = async (req, res) => {
  uid = req.params.id;
  const staff = await StaffMember.findByPk(uid);
  if (staff === null) {
    res.status(404).json({
      status: false,
      code: 404,
      message: "user is not found",
    });
    return;
  }
  staff
    .then((res) => {
      res.status(200).json({
        status: true,
        code: 200,
        response: res,
        message: "staff member found successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        code: 500,
        message: `error found ${err}`,
      });
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
      res.status(201).json({
        status: true,
        code: 201,
        response: createdStaff.toJson(),
        message: "new staff created successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        code: 500,
        message: `error found ${err}`,
      });
    });
};

exports.update_staff_member = (req, res) => {
  const updatedStaff = {};
  for (const ops of req.body) {
    updatedStaff[ops.propName] = ops.value;
  }
  StaffMember.update({ _id: req.params.id }, { $set: updatedStaff })
    .exec()
    .then((res) => {
      res.status(200).json({
        status: true,
        code: 200,
        message: "staff successfully updated",
      });
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

exports.delete_staff_member = (req, res) => {
  const uid = req.params.id;
  if (!uid) {
    res.status(404).json({
      status: false,
      code: 404,
      message: "staff member is not found",
    });
    return;
  }

  StaffMember.destroy({
    where: {
      id: uid,
    },
  })
    .then((staff) => {
      res.status(200).json({
        status: true,
        code: 200,
        message: "staff member successfully deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        code: 500,
        message: `error found ${err}`,
      });
    });
};
