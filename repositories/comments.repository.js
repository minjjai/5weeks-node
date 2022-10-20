const {Comments}=require('../models');

class CommentRepository {
    findAllComment = async()=>{
        const comments = await Comments.findAll();
        return comments
    }

    findCommentById = async(commentId)=>{
        const comment = await Comments.findByPk(commentId)

        return comment
    }

    createComment = async(nickname,comment)=>{
        const createCommentData = await Comments.create({
            nickname,
            comment
        })
        return createCommentData
    }

    updateComment = async(commentId,nickname,comment)=>{
        const updatePostData = await Comments.update(
            {comment},
            {where:{commentId}}
        )
        return updatePostData
    }
    deleteComment = async(commentId)=>{
        const deleteCommentData = await Comments.destroy({where:{commentId}})
    return deleteCommentData
    }
}

module.exports = CommentRepository