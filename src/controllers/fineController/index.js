module.exports = {
  getFinesByUser: require("./getFinesByUser"),
  getFinesByAdmin: require("./getFinesByAdmin"),
  getFine: require("./getFine"),
  createFine: require("./createFine"),
  updateFine: require("./updateFine").updateFine,
  deleteFine: require("./deleteFine"),
  notification: require("./updateFine").notification,
};
