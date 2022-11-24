const express = require("express");
const router = express.Router();
const isAdminLogged = require("../guard/admin.login.guard");

const NewsController = require("../controllers/newsController");

router.get("/", NewsController.get_all_news);

router.post("/", isAdminLogged, NewsController.add_news);

router
  .route("/:id")
  .get(NewsController.get_news_by_id)
  .put(isAdminLogged, NewsController.update_news)
  .delete(isAdminLogged, NewsController.delete_news)

module.exports = router;
