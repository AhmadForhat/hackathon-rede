const { UserInputError } = require('apollo-server')

const Post = require('../../../models/Post')
const checkAuth = require('../../../util/check-auth')

const createComment = async (postId, body, context) => {
  const { username } = checkAuth(context)
  if(body.trim() === '') {
    throw new UserInputError('Empty comment', {
      errors: {
        body: 'Comment body must not empty'
      }
    })
  }

  try {
    const post = await Post.findById(postId)

    if(post) {
      post.comments.unshift({
        body,
        username,
        createdAt: new Date().toISOString()
      })
      await post.save()

      return post
    } else {
      throw new UserInputError('Post not found')
    }
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = createComment
