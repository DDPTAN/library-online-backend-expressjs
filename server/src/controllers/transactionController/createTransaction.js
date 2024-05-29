const httpStatus = require("http-status");

const {
  successResponse,
  errorResponse,
} = require("../../serializers/responseSerializer");
const {
  validateCreateTransactionRequest,
} = require("../../serializers/transactionSerializer");
const {
  getTransaction,
  createTransaction,
} = require("../../repositories/transactionRepository");

module.exports = async (req, res) => {
  try {
    const newTransaction = {
      idBook: req.body.idBook,
      idUser: req.userData.id,
      isStatus: req.body.isStatus,
    };

    const error = validateCreateTransactionRequest(newTransaction);
    if (error) {
      const errors = new Error(error);
      errors.status = httpStatus.BAD_REQUEST;
      throw errors;
    }

    // create transaction
    const { data: transactionData, error: errorCreateNewTransaction } =
      await createTransaction(newTransaction);
    if (errorCreateNewTransaction) {
      const error = new Error(errorCreateNewTransaction);
      error.status = httpStatus.INTERNAL_SERVER_ERROR;
      throw error;
    }

    const { data: transaction, error: errorGetTransaction } =
      await getTransaction(transactionData.id);

    if (errorGetTransaction) {
      const errors = new Error(errorGetTransaction);
      errors.status = httpStatus.NOT_FOUND;
      throw errors;
    }

    successResponse({
      response: res,
      message: "Transaction successfully added",
      status: httpStatus.CREATED,
      data: transaction,
    });
  } catch (error) {
    errorResponse({
      response: res,
      error: error,
    });
  }
};
