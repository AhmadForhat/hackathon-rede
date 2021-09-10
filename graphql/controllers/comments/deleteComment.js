const { UserInputError, AuthenticationError } = require('apollo-server')

const Post = require('../../../models/Post')
const checkAuth = require('../../../util/check-auth')

const deleteComment = async (postId, commentId, context) => {
  const { username } = checkAuth(context)

  try {
    const post = await Post.findById(postId)

    if(post) {
      const commentIndex = post.comments.findIndex(comment => comment.id === commentId)
      if(post.comments[commentIndex].username === username) {
        post.comments.splice(commentIndex, 1)
        await post.save()

        return post
      } else {
        throw new AuthenticationError('Action not allowed')
      }
    } else {
      throw new UserInputError('Post not found')
    }
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = deleteComment
