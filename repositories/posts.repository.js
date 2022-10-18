const { Posts } = require("../models");
const { Likes } = require("../models");

class PostRepository {
  getPosts = async () => {
    // ORM인 Sequelize에서 Posts 모델의 findAll 메소드를 사용해 데이터를 요청합니다.
    const posts = await Posts.findAll();

    return posts;
  };

  findPostById = async (postsId) => {
    const post = await Posts.findByPk(postsId);

    return post;
  };

  createPost = async (nickname, title, content) => {
    // ORM인 Sequelize에서 Posts 모델의 create 메소드를 사용해 데이터를 요청합니다.
    console.log(nickname, title, content);
    const createPostData = await Posts.create({
      user: nickname,
      likeSum: 0,
      title,
      content,
    });

    return createPostData;
  };

  updatePost = async (postsId, title, content) => {
    const updatePostData = await Posts.update(
      { title, content },
      { where: { postsId } }
    );

    return updatePostData;
  };

  deletePost = async (postsId) => {
    const updatePostData = await Posts.destroy({ where: { postsId } });

    return updatePostData;
  };

  createLike = async (postsId, nickname) => {
    const createLike = await Likes.create({ user: nickname, like: postsId });
  };
  countLike = async (postsId) => {
    const countLike = await Posts.increment(
      { likeSum: 1 },
      { where: { postsId: postsId } }
    );
    return countLike;
  };
  deleteLike = async (postsId, nickname) => {
    const deleteLike = await Likes.destroy({
      where: { user: nickname, like: postsId },
    });
    return deleteLike;
  };
  discountLike = async (postsId) => {
    const discountLike = await Posts.decrement(
      { likeSum: 1 },
      { where: { postsId: postsId } }
    );
    return discountLike;
  };
  findLikedPosts = async (nickname) => {
    console.log(nickname);
    const likes = await Likes.findAll({ where: { user: nickname } });
    console.log(likes, "표식");
    return likes;
  };
}

module.exports = PostRepository;
