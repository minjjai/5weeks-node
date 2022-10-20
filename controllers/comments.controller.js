const CommentService = require('../services/comments.service')

class CommentsController {
    commentService = new CommentService()

    getComments = async(req,res,next)=>{
        const comments = await this.commentService.findAllComment();

        res.status(200).json({data:comments})
    }
    getCommnetById =async(req,res,next)=>{
        const{postId}=req.params;
        const comment = await this.commentService.findCommentById(postId) 
        res.status(200).json({data:comment})
    }

    createComment = async(req,res,next)=>{
        const {nickname, comment}=req.body;

        const createCommentData = await this.commentService.createComment(nickname,comment);
        res.status(200).json({data:createCommentData})
    }
    updateComment = async(req,res,next)=>{
        const {commentId}=req.params;
        const {nickname,comment}=req.body;

        const updateCommentData = await this.commentService.updateComment(
            commentId,
            nickname
        )
        res.status(200).json({data:updateCommentData})
    }
    deleteComment = async(req,res,next)=>{
        const {commentId}=req.params;
        const deleteCommentData = await this.commentService.deleteComment(commentId)
        res.status(200).json({data:deleteCommentData})
    }
}

module.exports = CommentsController;

