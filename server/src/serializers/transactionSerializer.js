const joi = require("joi");

const { Transactions } = require("../../database/models");

exports.singleTransactionResponse = (transactionData) => {
  const transaction =
    transactionData instanceof Transactions
      ? transactionData.get({ plain: true })
      : transactionData;

  return {
    id: transaction.id,
    idBook: transaction.idBook,
    idUser: transaction.idUser,
    isStatus: transaction.isStatus,
    user: transaction.user,
    book: transaction.book,
  };
};

exports.multipleTransactionResponse = (transactionsData) => {
  return transactionsData.map((el) => {
    return this.singleTransactionResponse(el);
  });
};

exports.validateCreateTransactionRequest = (transactionData) => {
  const schema = joi.object({
    idBook: joi.number().required(),
    idUser: joi.string().required(),
    isStatus: joi.boolean().required(),
  });

  try {
    const { error } = schema.validate(transactionData, { allowUnknown: true });
    if (error) {
      throw new Error(`request data invalid: ${error}`);
    }
    return null;
  } catch (error) {
    return error.message;
  }
};

exports.validateUpdateTransactionRequest = (transactionData) => {
  const schema = joi.object({
    idBook: joi.number().required(),
    idUser: joi.string().required(),
    isStatus: joi.boolean().required(),
  });

  try {
    const { error } = schema.validate(transactionData, { allowUnknown: true });
    if (error) {
      throw new Error(`request data invalid: ${error}`);
    }
    return null;
  } catch (error) {
    return error.message;
  }
};
