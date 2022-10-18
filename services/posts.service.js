const PostRepository = require("../repositories/posts.repository");

class PostService {
  postRepository = new PostRepository();

  getPosts = async () => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const allPost = await this.postRepository.getPosts();

    // 호출한 Post들을 가장 최신 게시글 부터 정렬합니다.
    allPost.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return allPost;
  };

  findPostById = async (postsId) => {
    const findPost = await this.postRepository.findPostById(postsId);

    return findPost;
  };

  createPost = async (nickname, title, content) => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const createPostData = await this.postRepository.createPost(
      nickname,
      title,
      content
    );

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return {
      postsId: createPostData.null,
      nickname: createPostData.nickname,
      title: createPostData.title,
      content: createPostData.content,
      createdAt: createPostData.createdAt,
      updatedAt: createPostData.updatedAt,
    };
  };

  updatePost = async (postsId, nickname, title, content) => {
    await this.postRepository.updatePost(postsId, title, content);
    const findPost = await this.postRepository.findPostById(postsId);
    if (!findPost) throw new Error("Post doesn't exist");
    if (findPost.user !== nickname) {
      return "권한이 없습니다.";
    }

    return findPost;
  };

  deletePost = async (postsId, nickname) => {
    const findPost = await this.postRepository.findPostById(postsId);
    if (!findPost) throw new Error("Post doesn't exist");
    if (findPost.user !== nickname) {
      return "권한이 없습니다.";
    }

    await this.postRepository.deletePost(postsId);

    return findPost;
  };

  likePost = async (postsId, like, nickname) => {
    if (like) {
      const createLike = await this.postRepository.createLike(
        postsId,
        nickname
      );
      const countLike = await this.postRepository.countLike(postsId);
      return "게시글의 좋아요를 등록하였습니다.";
    } else {
      const deleteLike = await this.postRepository.deleteLike(
        postsId,
        nickname
      );
      const discountLike = await this.postRepository.discountLike(postsId);
      return "게시글의 좋아요를 취소하였습니다.";
    }
  };

  findLikedPosts = async (nickname) => {
    const likes = await this.postRepository.findLikedPosts(nickname);
    console.log(likes);
    const array = likes.map((a) => a.like);
    console.log(array);
    const likedPosts = [];
    for (let i = 0; i < likes.length; i++) {
      const posts = await this.postRepository.findPostById(array[i]);
      console.log(posts);
      if (posts) {
        likedPosts.push(posts);
      } else {
        likedPosts.push("삭제된 게시글 입니다");
      }
    }
    if (likedPosts.length) {
      return likedPosts;
    } else {
      return "좋아요한 게시글이 없습니다.";
    }
  };
}

module.exports = PostService;
