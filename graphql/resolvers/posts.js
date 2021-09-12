const { PubSub } = require('graphql-subscriptions')

const {
  getPostsController,
  getPostController,
  createPostController,
  deletePostController
} = require('../controllers/posts')

const pubsub = new PubSub();

module.exports = {
  Query: {
    getPosts: () => getPostsController(),
    getPost: (_, { postId }) => getPostController(postId),
  },
  Mutation: {
    createPost: (_, { createPostInput: body }, context)  => createPostController(body, context, pubsub),
    deletePost: (_, { postId }, context) => deletePostController(postId, context)
  },
  Subscription: {
    newPost: {
      subscribe: () => pubsub.asyncIterator('NEW_POST')
    }
  }
}
