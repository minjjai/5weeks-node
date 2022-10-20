const express = require('express');
const router = express.Router();


const CommentsController = require('../controllers/comments.controller')
const commentsController = new CommentsController();

router.get('/comments',commentsController.getComments);
router.get('/comments/:commnetsId',commentsController.getCommnetById);
router.post('/comments',commentsController.createComment);
router.put('/comments',commentsController.updateComment);
router.delete('/comments/:commnetsId',commentsController.deleteComment);

module.exports = router;