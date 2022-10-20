const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware')

const CommentsController = require('../controllers/comments.controller')
const commentsController = new CommentsController();

router.get('/comments',authMiddleware,commentsController.getComments);
router.get('/comments/:commnetsId',authMiddleware,commentsController.getCommnetById);
router.post('/posts',authMiddleware,commentsController.createComment);
router.put('/posts',authMiddleware,commentsController.updateComment);
router.delete('/comments/:commnetsId',authMiddleware,commentsController.deleteComment);

module.exports = router;