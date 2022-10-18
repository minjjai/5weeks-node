const { request } = require("express");
const PostService = require("../services/posts.service");

// Post의 컨트롤러(Controller)역할을 하는 클래스
class PostsController {
  postService = new PostService(); // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

  getPosts = async (req, res, next) => {
    // 서비스 계층에 구현된 findAllPost 로직을 실행합니다.
    const posts = await this.postService.getPosts();

    res.status(200).json({ data: posts });
  };

  getPostById = async (req, res, next) => {
    const { postsId } = req.params;
    const post = await this.postService.findPostById(postsId);

    res.status(200).json({ data: post });
  };

  createPost = async (req, res, next) => {
    const nickname = res.locals.user.nickname;
    const { title, content } = req.body;
    if (!req.headers.authorization) {
      res.status(400).json({ error: "권한이 없습니다." });
      return;
    }

    // 서비스 계층에 구현된 createPost 로직을 실행합니다.
    const createPostData = await this.postService.createPost(
      nickname,
      title,
      content
    );

    res.status(201).json({ data: createPostData });
  };

  updatePost = async (req, res, next) => {
    const { postsId } = req.params;
    const { title, content } = req.body;
    const nickname = res.locals.user.nickname;

    const updatePost = await this.postService.updatePost(
      postsId,
      nickname,
      title,
      content
    );

    res.status(200).json({ data: updatePost });
  };

  deletePost = async (req, res, next) => {
    const { postsId } = req.params;
    const nickname = res.locals.user.nickname;

    const deletePost = await this.postService.deletePost(postsId, nickname);

    res.status(200).json({ data: deletePost });
  };

  likePost = async (req, res, next) => {
    const { postsId } = req.params;
    const { like } = req.body;
    const nickname = res.locals.user.nickname;

    const likePost = await this.postService.likePost(postsId, like, nickname);
    res.status(200).json({ data: likePost });
  };

  getLikedPosts = async (req, res, next) => {
    const nickname = res.locals.user.nickname;
    const findLikedPosts = await this.postService.findLikedPosts(nickname);
    res.status(200).json({ data: findLikedPosts });
  };
}

module.exports = PostsController;
