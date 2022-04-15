const New = require("../models/New");
exports.get_all_news = (req, res) => {
  New.findAll()
    .then((news) => {
      res.send(news);
      console.log("news ");
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};

exports.get_news_by_id = (req, res) => {
  New.findAll({
    where: { id: req.params.id },
  }).then(newValue => {
      res.status(200).json({
        message: 'news get successfully',
        response: {
          data: newValue,
        }
      })
  }).catch(err => {
      console.log("err: ", err)
  })
};


exports.update_news = (req, res) => {
    New.update({
        title: "good",
    }, {
        where: {
            id: req.params.id,
        }
    }).then(updated_new => {
        res.send("new updated", updated_new);
        console.log("updated new ", updated_new);
    }).catch(err => {
        console.log("err found while updating new: ", err)
    })
}

exports.delete_news = (req, res) => {
  New.destroy({
    where: {
      id: req.params.id
    }
  }).then(newsValue => {
    console.log("news deleted sucessfully");
  }).catch(err => {
    console.log("err: ", err)
  })
}