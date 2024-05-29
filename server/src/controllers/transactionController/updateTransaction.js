const httpStatus = require("http-status");

const {
  getTransaction,
  updateTransaction,
} = require("../../repositories/transactionRepository");
const {
  validateUpdateTransactionRequest,
  singleTransactionResponse,
} = require("../../serializers/transactionSerializer");
const {
  successResponse,
  errorResponse,
} = require("../../serializers/responseSerializer");

module.exports = async (req, res) => {
  try {
    const transactionUpdateData = {
      idBook: req.body.idBook,
      idUser: req.userData.id,
      isStatus: req.body.isStatus,
    };

    const error = validateUpdateTransactionRequest(transactionUpdateData);
    if (error) {
      const errors = new Error(error);
      errors.status = httpStatus.BAD_REQUEST;
      throw errors;
    }

    const { data: transaction, error: errorFindTransaction } =
      await getTransaction(req.params.id);
    if (errorFindTransaction) {
      const errors = new Error(errorFindTransaction);
      errors.status = httpStatus.NOT_FOUND;
      throw errors;
    }

    if (
      req.body.idBook !== undefined &&
      req.body.idBook !== transaction.idBook
    ) {
      transaction.idBook = req.body.idBook;
    }

    if (
      req.body.isStatus !== undefined &&
      req.body.isStatus !== transaction.isStatus
    ) {
      transaction.isStatus = req.body.isStatus;
    }

    const { error: errorOnUpdateTransaction } = await updateTransaction(
      transaction
    );
    if (errorOnUpdateTransaction) {
      const errors = new Error(errorOnUpdateTransaction);
      errors.status = httpStatus.INTERNAL_SERVER_ERROR;
      throw errors;
    }

    const { data: transactionUpdated, error: errorGetTransaction } =
      await getTransaction(transaction.id);
    if (errorGetTransaction) {
      const errors = new Error(errorGetTransaction);
      errors.status = httpStatus.NOT_FOUND;
      throw errors;
    }

    successResponse({
      response: res,
      message: "Transaction successfully updated",
      status: httpStatus.OK,
      data: singleTransactionResponse(transactionUpdated),
    });
  } catch (error) {
    errorResponse({
      response: res,
      error: error,
    });
  }
};
