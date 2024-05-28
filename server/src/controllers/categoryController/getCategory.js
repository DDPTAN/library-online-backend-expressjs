const httpStatus = require("http-status");

const { getCategory } = require("../../repositories/categoryRepository");
const {
  successResponse,
  errorResponse,
} = require("../../serializers/responseSerializer");
const { singleCategoryResponse } = require("../../serializers/categorySerializer");

module.exports = async (req, res) => {
  try {
    const { data: user, error } = await getCategory(req.params.id);
    if (error) {
      const errors = new Error(error);
      errors.status = httpStatus.NOT_FOUND;
      throw errors;
    }

    successResponse({
      response: res,
      status: httpStatus.OK,
      data: singleCategoryResponse(user),
    });
  } catch (error) {
    errorResponse({
      response: res,
      error: error,
    });
  }
};
