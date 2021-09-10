const { AuthenticationError } = require('apollo-server')

const Post = require('../../../models/Post')
const checkAuth = require('../../../util/check-auth')

const deletePost = async (postId, context) => {
  const user = checkAuth(context)

  try {
    const post = await Post.findById(postId)
    if(post) {
      if(user.username === post.username) {
        await post.delete()

        return 'Post delete successfully'
      } else {
        throw new AuthenticationError('Action not allowed')
      }
    } else {
      throw new AuthenticationError('Invalid postId')
    }
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = deletePost
