
const {Posts}=require('../models');

class PostRepository{
    findAllPost = async()=>{
        const posts = await Posts.findAll();
        return posts;
    }

    findPostById = async(postId)=>{
        const post = await Posts.findByPk(postId);
        return post;
    }

    createPost = async(userId,title,content,nickname)=>{
        const createPostData = await Posts.create({
            userId,
            title,
            content,
            nickname
        })
        
        return createPostData
    }
    updatePost = async(postId,title,content)=>{
        const updatePostData = await Posts.update(
            {title,content},
            {where:{postId}}


            )
            return updatePostData
    };

    deletePost = async(postId)=>{
        const deletePostData = await Posts.destroy({where:{postId}})
        return deletePostData;
    }
        
}
module.exports = PostRepository;

