const { Comments } = require("../models");

class CommentRepository {
  //   findAllComment = async () => {
  //     // ORM인 Sequelize에서 Posts 모델의 findAll 메소드를 사용해 데이터를 요청합니다.
  //     const comments = await Comments.findAll();

  //     return comments;
  //   };

  findCommentsByPostId = async (postsId) => {
    const comments = await Comments.findAll({ where: { postsId } });

    return comments;
  };

  findCommentById = async (commentId) => {
    const comment = await Comments.findByPk(commentId);

    return comment;
  };

  createComment = async (postsId, nickname, content) => {
    console.log(postsId, nickname, content, "콘솔");
    // ORM인 Sequelize에서 Posts 모델의 create 메소드를 사용해 데이터를 요청합니다.
    const createCommentData = await Comments.create({
      postsId: postsId,
      user: nickname,
      content: content,
    });

    return createCommentData;
  };

  updateComment = async (commentId, nickname, content) => {
    const updateCommentData = await Comments.update(
      {
        user: nickname,
        content,
      },
      { where: { commentId } }
    );

    return updateCommentData;
  };

  deleteComment = async (commentId) => {
    const updateCommentData = await Comments.destroy({ where: { commentId } });

    return updateCommentData;
  };
}

module.exports = CommentRepository;
