const PostService = require('../services/posts.service');

class PostsCotroller {
    postService = new PostService();

    createPost = async (req, res, next) => {
        const { title,content} = req.body;
        
        const {nickname,userId}=res.locals.user;   
      

        const createPosts = await this.postService.createPosts(userId,title,content,nickname)
        res.status(201).json({data:createPosts});
    }

    updatePost = async (req, res, next) => {
        const {postId}=req.params;
        const{title,content}=req.body;

        const updatePost = await this.postService.updatePost({postId,title,content})

        res.status(200).json({updatePost});
    }
    getPosts = async (req, res, next) => {
        const findAllPost = await this.postService.findAllPost();

        res.status(200).json({findAllPost});
    }
    getPostsById = async (req, res, next) => {
        const {postId}=req.params;
        const findPostById = await this.postService.findPostById(postId);
        res.status(200).json({findPostById});
    }
    deletePost = async (req, res, next) => {
        const {postId}=req.params;
        const deletePost = await this.postService.deletePost(postId);
        res.status(200).json({deletePost});
    }
    
}

module.exports=PostsCotroller;
