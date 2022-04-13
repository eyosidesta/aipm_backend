const express = require("express");
const router = express.Router();
const isAdminLogged = require("../guard/admin.login.guard");

const NewsController = require("../controllers/news");

router.get("/", NewsController.get_all_news);

router.post("/", isAdminLogged, (req, res) => {
  res.send("news post");
});

router
  .route("/:id")
  .get(NewsController.get_new)
  .put(isAdminLogged, NewsController.update_news)
  .delete(isAdminLogged, NewsController.delete_news)

module.exports = router;
