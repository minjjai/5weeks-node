const { request } = require("express");
const CommentService = require("../services/comments.service");

// Post의 컨트롤러(Controller)역할을 하는 클래스
class CommentsController {
  commentService = new CommentService(); // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

  //   getComments = async (req, res, next) => {
  //     // 서비스 계층에 구현된 findAllPost 로직을 실행합니다.
  //     const comments = await this.commentService.findAllComment();

  //     res.status(200).json({ data: comments });
  //   };

  getCommentsByPostId = async (req, res, next) => {
    const { postsId } = req.params;
    const comments = await this.commentService.findCommentsByPostId(postsId);

    res.status(200).json(comments);
  };

  createComment = async (req, res, next) => {
    const { content } = req.body;
    const { postsId } = req.params;
    const nickname = res.locals.user.nickname;

    // 서비스 계층에 구현된 createPost 로직을 실행합니다.
    const createCommentData = await this.commentService.createComment(
      postsId,
      nickname,
      content
    );

    res.status(201).json({ data: createCommentData });
  };

  updateComment = async (req, res, next) => {
    const { commentId } = req.params;
    const { content } = req.body;
    const nickname = res.locals.user.nickname;

    const updateComment = await this.commentService.updateComment(
      commentId,
      nickname,
      content
    );

    res.status(200).json({ data: updateComment });
  };

  deleteComment = async (req, res, next) => {
    const { commentId } = req.params;
    const nickname = res.locals.user.nickname;

    const deletePost = await this.commentService.deleteComment(
      commentId,
      nickname
    );

    res.status(200).json({ data: deletePost });
  };
}

module.exports = CommentsController;
