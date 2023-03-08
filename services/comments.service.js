const CommentRepository = require("../repositories/comments.repository");

class CommentService {
  commentRepository = new CommentRepository();

  findCommentsByPostId = async (postsId) => {
    const findComments = await this.commentRepository.findCommentsByPostId(
      postsId
    );

    return findComments;
  };

  createComment = async (postsId, nickname, content) => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const createCommentData = await this.commentRepository.createComment(
      postsId,
      nickname,
      content
    );

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return {
      commentId: createCommentData.null,
      postsId: createCommentData.postsId,
      user: createCommentData.nickname,
      content: createCommentData.content,
      createdAt: createCommentData.createdAt,
      updatedAt: createCommentData.updatedAt,
    };
  };

  updateComment = async (commentId, user, content) => {
    await this.commentRepository.updateComment(commentId, nickname, content);

    const findComment = await this.commentRepository.findCommentById(commentId);
    if (!findComment) throw new Error("Comment doesn't exist");
    if (findComment.user !== user) {
      return "권한이 없습니다.";
    }

    return findComment;
  };

  deleteComment = async (commentId, password) => {
    const findComment = await this.commentRepository.findCommentById(commentId);
    if (!findComment) throw new Error("Comment doesn't exist");
    if (findComment.user !== nickname) {
      return "권한이 없습니다.";
    }
    await this.commentRepository.deleteComment(commentId, password);

    return findComment;
  };
}

module.exports = CommentService;
