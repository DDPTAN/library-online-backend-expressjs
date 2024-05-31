const httpStatus = require("http-status");

const { getFine, updateFine } = require("../../repositories/fineRepository");
const {
  validateUpdateFineRequest,
  singleFineResponse,
} = require("../../serializers/fineSerializer");
const {
  successResponse,
  errorResponse,
} = require("../../serializers/responseSerializer");

module.exports = async (req, res) => {
  try {
    const fineUpdateData = {
      idBook: req.body.idBook,
      idUser: req.userData.id,
      totalDay: req.body.totalDay,
      totalFine: req.body.totalFine,
    };

    const error = validateUpdateFineRequest(fineUpdateData);
    if (error) {
      const errors = new Error(error);
      errors.status = httpStatus.BAD_REQUEST;
      throw errors;
    }

    const { data: fine, error: errorFindFine } = await getFine(req.params.id);
    if (errorFindFine) {
      const errors = new Error(errorFindFine);
      errors.status = httpStatus.NOT_FOUND;
      throw errors;
    }

    if (req.body.idBook !== undefined && req.body.idBook !== fine.idBook) {
      fine.idBook = req.body.idBook;
    }

    if (
      req.body.totalDay !== undefined &&
      req.body.totalDay !== fine.totalDay
    ) {
      fine.totalDay = req.body.totalDay;
    }

    if (
      req.body.totalFine !== undefined &&
      req.body.totalFine !== fine.totalFine
    ) {
      fine.totalFine = req.body.totalFine;
    }

    // if (req.body.status !== undefined && req.body.status !== fine.status) {
    //   fine.status = req.body.status;
    // }

    // if (req.body.token !== undefined && req.body.token !== fine.token) {
    //   fine.token = req.body.token;
    // }

    const { error: errorOnUpdateFine } = await updateFine(fine);
    if (errorOnUpdateFine) {
      const errors = new Error(errorOnUpdateFine);
      errors.status = httpStatus.INTERNAL_SERVER_ERROR;
      throw errors;
    }

    const { data: fineUpdated, error: errorGetFine } = await getFine(fine.id);
    if (errorGetFine) {
      const errors = new Error(errorGetFine);
      errors.status = httpStatus.NOT_FOUND;
      throw errors;
    }

    successResponse({
      response: res,
      message: "Fine successfully paid",
      status: httpStatus.OK,
      data: singleFineResponse(fineUpdated),
    });
  } catch (error) {
    errorResponse({
      response: res,
      error: error,
    });
  }
};
