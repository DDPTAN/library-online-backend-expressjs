const express = require("express");
const authRouter = require("./authRouter");
const userRouter = require("./userRouter");
const categoryRouter = require("./categoryRouter");
const bookRouter = require("./bookRouter");
const transactionRouter = require("./transactionRouter");

const router = express.Router();

// Set up your routes
router.use(authRouter);
router.use(userRouter);
router.use(categoryRouter);
router.use(bookRouter);
router.use(transactionRouter);

module.exports = router;