const express = require("express");
const router = express.Router();
const isAdminLogged = require("../guard/admin.login.guard");

const staffController = require("../controllers/staffController");

router.get("/", staffController.get_all_staff_members);

router.post("/", isAdminLogged, (req, res) => {
  res.send("staff members post");
});

router
  .route("/:id")
  .get(staffController.get_staff_member_by_id)
  .put(staffController.update_staff_member)
  .delete(isAdminLogged, staffController.delete_staff_member);

module.exports = router;
