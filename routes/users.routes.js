const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users.controller");
const usersController = new UsersController();

router.post("/signup", usersController.registerUser);
router.post("/login", usersController.loginUser);
// router.get("/:postId", authMiddleware, postsController.getPostById);
// router.post("/", authMiddleware, postsController.createPost);
// router.put("/:postId", authMiddleware, postsController.updatePost);
// router.delete("/:postId", authMiddleware, postsController.deletePost);

module.exports = router;
