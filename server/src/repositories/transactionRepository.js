const { Transactions, Users, Books } = require("../../database/models");
// ---------------------------------------------------------

exports.getTransactionsByAdmin = async (
  offset = 0,
  limit = 10,
  filter = {}
) => {
  const response = { data: null, error: null, count: 0 };

  try {
    response.data = await Transactions.findAll({
      offset: offset,
      limit: limit,
      where: filter,
      include: [
        {
          model: Users,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt", "password"],
          },
        },
        {
          model: Books,
          as: "book",
          attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
        },
      ],
      attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
    });
    if (!response.data) {
      throw new Error("transactions data not found");
    }

    response.count = await Transactions.count({
      where: filter,
    });
  } catch (error) {
    response.error = `error on get datas : ${error.message}`;
  }

  return response;
};

exports.getTransactionsByUser = async (
  userId,
  offset = 0,
  limit = 10,
  filter = {}
) => {
  const response = { data: null, error: null, count: 0 };

  try {
    response.data = await Transactions.findAll({
      offset: offset,
      limit: limit,
      where: { ...filter, idUser: userId },
      include: [
        {
          model: Users,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt", "password"],
          },
        },
        {
          model: Books,
          as: "book",
          attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
        },
      ],
      attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
    });
    if (!response.data) {
      throw new Error("transactions data not found");
    }

    response.count = await Transactions.count({
      where: { ...filter, idUser: userId },
    });
  } catch (error) {
    response.error = `error on get datas : ${error.message}`;
  }

  return response;
};

exports.getTransaction = async (transactionId) => {
  const response = { data: null, error: null };

  try {
    response.data = await Transactions.findOne({
      where: {
        id: transactionId,
      },
      include: [
        {
          model: Users,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt", "password"],
          },
        },
        {
          model: Books,
          as: "book",
          attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
        },
      ],
      attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
    });

    if (!response.data) {
      throw new Error(`transaction not found`);
    }
  } catch (error) {
    response.error = `error on get data : ${error.message}`;
  }

  return response;
};

exports.createTransaction = async (transaction) => {
  const response = { data: null, error: null };

  try {
    response.data = await Transactions.create({
      idBook: transaction.idBook,
      idUser: transaction.idUser,
      isStatus: transaction.isStatus,
    });
  } catch (error) {
    response.error = `error on create data : ${error.message}`;
  }

  return response;
};

exports.updateTransaction = async (transaction) => {
  const response = { data: null, error: null };

  try {
    response.data = await transaction.save();
  } catch (error) {
    response.error = `error on update data : ${error.message}`;
  }

  return response;
};

exports.deleteTransaction = async (transaction) => {
  const response = { data: null, error: null };

  try {
    response.data = await transaction.destroy();
  } catch (error) {
    response.error = `error on delete data : ${error.message}`;
  }

  return response;
};
