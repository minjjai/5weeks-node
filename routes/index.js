const express = require("express");
const router = express.Router();

const postsRouter = require("./posts.routes");
router.use("/posts", postsRouter);
const commentsRouter = require("./comments.routes");
router.use("/comments", commentsRouter);
const usersRouter = require("./users.routes");
router.use("/users", usersRouter);

module.exports = router;
