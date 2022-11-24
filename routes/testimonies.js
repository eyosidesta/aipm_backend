const express = require("express");
const router = express.Router();
const isAdminLogged = require("../guard/admin.login.guard");

const testimonyController = require("../controllers/testimonyController");

router.get("/", testimonyController.get_all_testimonies);

router.post("/", isAdminLogged, testimonyController.add_testimony);

router
  .route("/:id")
  .get(testimonyController.get_testimony_by_id)
  .put(isAdminLogged, testimonyController.update_testimony)
  .delete(isAdminLogged, testimonyController.delete_testimony);

module.exports = router;
