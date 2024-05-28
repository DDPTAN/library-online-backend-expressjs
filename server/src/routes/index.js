const express = require("express");
const authRouter = require("./authRouter");
const userRouter = require("./userRouter");
const categoryRouter = require("./categoryRouter");

const router = express.Router();

// Set up your routes
router.use(authRouter);
router.use(userRouter);
router.use(categoryRouter);

module.exports = router;