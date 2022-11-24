const New = require("../models/New");
const response = require("../utils/responses");
const sucessMessage = require("../utils/success_messages");
const errorMessage = require("../utils/error_messages");


exports.get_all_news = (req, res) => {
  New.findAll()
    .then((news) => {
      res.status(200).json({
        message: 'news fetched successfully',
        data: news
      })
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};

exports.get_news_by_id = async (req, res) => {
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
      message: "news is not found",
    });
    return;
  }
  const news = await New.findByPk(convertedToNum);
  if (!news) {
    res.status(404).json(response.failure_response(errorMessage.error_404("News"), 404, null))
    return;
  }
  res.status(200).json(response.success_response(sucessMessage.found_by_id_message('News', convertedToNum), 200, news))
  return;
};

exports.add_news = async (req, res) => {
  const news = await New.create({
    title: req.body.title,
    detail: req.body.detail,
    imageUrl: req.body.imageUrl,
  });
  if (news) {
    res.status(201).json(
      response.success_response(
        sucessMessage.added_message("News"),
        201,
        news
      )
    )
  } else {
    res.status(500).json(
      response.FailureResponse(
        errorMessage.added_error("News"),
        500,
        news
      )
    )
  }

}

exports.update_news = async (req, res) => {
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
      message: "news is not found",
    });
    return;
  }
  const news = await New.findByPk(convertedToNum);
  if (!news) {
    res.status(404).json(response.failure_response(errorMessage.error_404("News"), 404, null))
    return;
  }
  const updateNews = {};
  const inputValue = req.body;
  const keys = Object.keys(inputValue);

  keys.forEach(items => {
    updateNews[items] = inputValue[items]
  })
  New.update({
    title: updateNews.title,
    detail: updateNews.detail,
    imageUrl: updateNews.imageUrl,
  }, {
    where: {
      id: convertedToNum,
    }
  }).then((news) => {
    res
      .status(201)
      .json(
        response.success_response(
          sucessMessage.updated_message("News"),
          201,
          updateNews
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


exports.delete_news = async (req, res) => {
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
      error: "news is not found",
    });
    return;
  }

  const news = await New.findByPk(convertedToNum);
  if (!news) {
    res.status(404).json(response.failure_response(errorMessage.error_404("News"), 404, null))
    return;
  }

  New.destroy({
    where: {
      id: convertedToNum,
    },
  })
    .then((newsValue) => {
      res
        .status(200)
        .json(
          response.success_response(
            sucessMessage.deleted_message("News"),
            200,
            news
          )
        );
    })
    .catch((err) => {
      res
        .status(500)
        .json(
          response.failure_response(
            errorMessage.added_error("News"),
            500,
            err
          )
        );
    });
};