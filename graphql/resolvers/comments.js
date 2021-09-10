const {
  createCommentController,
  deleteCommentController,
  likePostController
} = require('../controllers/comments')

module.exports = {
  Mutation: {
    createComment: (_, { postId, body }, context) => createCommentController(postId, body, context),
    deleteComment: (_, { postId, commentId }, context) => deleteCommentController(postId, commentId, context),
    likePost: (_, { postId }, context) => likePostController(postId, context)
  }
}
