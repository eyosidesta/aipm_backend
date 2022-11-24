const express = require("express");
const router = express.Router();
const isAdminLogged = require("../guard/admin.login.guard");

const staffController = require("../controllers/staffController");

router.get("/", staffController.get_all_staff_members);

router.post("/", isAdminLogged, staffController.add_staff_member);

router
  .route("/:id")
  .get(staffController.get_staff_member_by_id)
  .put(isAdminLogged, staffController.update_staff_member)
  .delete(isAdminLogged, staffController.delete_staff_member);

module.exports = router;
