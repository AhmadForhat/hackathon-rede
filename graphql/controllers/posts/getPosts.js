const Post = require('../../../models/Post')

const getPosts = async () => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 })
    return posts
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = getPosts
