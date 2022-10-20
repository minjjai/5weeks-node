const CommentRepository =require('../repositories/comments.repository');



class CommentService {
    commentRepository = new CommentRepository();
    findAllComment = async()=>{
        const findAllComment =await this.commentRepository.findAllComment({
            attributes : {exclude: ['comments']}, 
            order: [['createdAt', 'DESC']],
        })

        findAllComment.sort((a,b)=>{
            return b.createdAt -a.createdAt
        })

        return findAllComment.map(comment=>{
            return {
                postId:post.postId,
                nickname:comment.nickname,
                comment,
                createdAt:comment.createdAt,
                updatedAt:comment.updatedAt

            }
        })

        
    }
    findCommentById = async(commentId)=>{
        const comment = await this.CommentsController.findCommentById(commentId);
        return {
            commentId:comment.commentId,
            nickname:findPost.nickname,
            comment:findPost.comment,
            createdAt:findPost.createdAt,
            updatedAt:findPost.updatedAt
        }
    }

    createComment = async(comment)=>{
        const createComment = await this.commentRepository.createComment(comment)
        return {
         
            nickname,
            comment,
            createdAt,
            updatedAt,
        }
    }
    updateComment = async(commentId)=>{{
        const updateComment = await CommentRepository.update({comment})
        return {
       
            nickname,
            comment,
            createdAt,
            updatedAt
        }
    }
    
    }
    deleteComment = async(commentId)=>{
        const deleteComment = await this.commentRepository.findComment(commentId);

        await this.commentRepository.deleteComment(commentId)
        return;
    }
}

module.exports = CommentService;