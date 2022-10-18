const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

const CommentsController = require("../controllers/comments.controller");
const commentsController = new CommentsController();

// router.get("/", postsController.getPosts);
router.get("/:postsId", commentsController.getCommentsByPostId);
router.post("/:postsId", authMiddleware, commentsController.createComment);
router.put("/:commentId", authMiddleware, commentsController.updateComment);
router.delete("/:commentId", authMiddleware, commentsController.deleteComment);

module.exports = router;
