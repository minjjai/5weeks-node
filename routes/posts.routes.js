const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth-middleware')
const PostsController = require('../controllers/posts.controller')
const postsController = new PostsController();

router.get('/',postsController.getPosts);
router.get('/:postId',postsController.getPostsById);
router.post('/posts',authMiddleware,postsController.createPost);
router.put('/:postId',postsController.updatePost);
router.delete('/:postId',authMiddleware,postsController.deletePost);


module.exports=router



