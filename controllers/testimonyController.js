const Testimony = require("../models/Testimony");
const response = require("../utils/responses");
const sucessMessage = require("../utils/success_messages");
const errorMessage = require("../utils/error_messages");

exports.get_all_testimonies = (req, res) => {
    Testimony.findAll()
        .then((testimonies) => {
            res
                .status(200)
                .json(
                    response.success_response(
                        sucessMessage.found_message("Testimony"),
                        200,
                        testimonies
                    )
                );
        })
        .catch((err) => {
            res
                .status(500)
                .json(
                    response.failure_response(
                        errorMessage.found_error("Testimony"),
                        500,
                        err
                    )
                );
        });
};

exports.get_testimony_by_id = async (req, res) => {
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
            message: "testimony is not found",
        });
        return;
    }
    const testimony = await Testimony.findByPk(convertedToNum);
    if (!testimony) {
        res.status(404).json(response.failure_response(errorMessage.error_404("Testimony"), 404, null))
        return;
    }
    res.status(200).json(response.success_response(sucessMessage.found_by_id_message('Testimony', convertedToNum), 200, testimony))
    return;
}

exports.add_testimony = async (req, res) => {
    const newTestimony = await Testimony.create({
        name: req.body.name,
        servicePlace: req.body.servicePlace,
        specialThing: req.body.specialThing,
        action: req.body.action,
        descriptionOne: req.body.descriptionOne,
        descriptionTwo: req.body.descriptionTwo,
        imageUrl: req.body.imageUrl,
    });

    if (newTestimony) {
        res
            .status(201)
            .json(
                response.success_response(
                    sucessMessage.updated_message("Testimony"),
                    201,
                    newTestimony
                )
            );
    } else {
        res
            .status(500)
            .json(
                response.failure_response(
                    errorMessage.added_error("Testimony"),
                    500,
                    err
                )
            );
    }
};

exports.update_testimony = async (req, res) => {
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
            message: "testimony is not found",
        });
        return;
    }
    const testimony = await Testimony.findByPk(convertedToNum);
    if (!testimony) {
        res.status(404).json(response.failure_response(errorMessage.error_404("Testimony"), 404, null))
        return;
    }
    const update_testimony = {};
    const inputValue = req.body;
    const keys = Object.keys(inputValue);

    keys.forEach(items => {
        update_testimony[items] = inputValue[items]
    })
    Testimony.update({
        name: update_testimony.name,
        servicePlace: update_testimony.servicePlace,
        specialThing: update_testimony.specialThing,
        action: update_testimony.action,
        descriptionOne: update_testimony.descriptionOne,
        descriptionTwo: update_testimony.descriptionTwo,
        imageUrl: update_testimony.imageUrl,
    }, {
        where: {
            id: convertedToNum,
        }
    }).then((testi) => {
        res
            .status(201)
            .json(
                response.success_response(
                    sucessMessage.updated_message("Testimony"),
                    201,
                    update_testimony
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

exports.delete_testimony = async (req, res) => {
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
        error: "testimony is not found",
      });
      return;
    }
  
    const testimony = await Testimony.findByPk(convertedToNum);
    if (!testimony) {
      res.status(404).json(response.failure_response(errorMessage.error_404("Testimony"), 404, null))
      return;
    }
  
    Testimony.destroy({
      where: {
        id: convertedToNum,
      },
    })
      .then((testimonyValue) => {
        res
          .status(200)
          .json(
            response.success_response(
              sucessMessage.deleted_message("Testimony"),
              200,
              testimony
            )
          );
      })
      .catch((err) => {
        res
          .status(500)
          .json(
            response.failure_response(
              errorMessage.added_error("Testimony"),
              500,
              err
            )
          );
      });
  };