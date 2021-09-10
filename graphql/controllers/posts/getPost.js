const Post = require('../../../models/Post')

const getPost = async (postId) => {
  try {
    const post = await Post.findById(postId)
    if(post) {
      return post;
    }else {
      throw new Error('Post not found!')
    }
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = getPost
