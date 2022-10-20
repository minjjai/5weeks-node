const PostRepository = require('../repositories/posts.repository')

class PostService {
    postRepository = new PostRepository()

    findAllPost = async ()=>{
        const allPost = await this.postRepository.findAllPost();

        allPost.sort((a,b)=>{
            return b.createdAt-a.createdAt;
        })

        return allPost.map((post)=>{
            return {
                postId:post.postId,
                userId:post.userId,
                title:post.title,
                content:post.content,
                nickname:post.nickname,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt
            }
        })
    }

    findPostById = async (postId)=>{
        const findPostById = await this.postRepository.findPostById(postId);
        return {
            postId:findPost.postId,
            nickname:findPost.nickname,
            title:findPost.title,
            content:findPost.content,
            createdAt:findPost.createdAt,

        }
    }
    createPosts = async(userId,title,content,nickname)=>{
       
        const createPosts =await this.postRepository.createPost(userId,title,content,nickname);
        return{
            postId:createPosts.null,
            userId:createPosts.userId,
            title:createPosts.title,
            content:createPosts.content,
            nickname:createPosts.nickname,
            createdAt:createPosts.createdAt,
            updatedAt:createPosts.updatedAt
        }
    }
    updatePost = async(title,content)=>{
        const {postId}=req.params;
        const updatePost = await this.postRepository.updatePost(postId,title,content)
        return{
            postId:updatePost.postId,
            nickname:updatePost.nickname,
            title:updatePost.title,
            content:updatePost.content
        }
        
    }
    deletePost = async(postId)=>{
        
        const deletePost = await this.postRepository.deletePost(postId)
        return deletePost;
               
    }

}

module.exports = PostService
