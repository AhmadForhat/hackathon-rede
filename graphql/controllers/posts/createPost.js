const Post = require('../../../models/Post')
const checkAuth = require('../../../util/check-auth')

const createPost = async (body, context, pubsub) => {
  const user = checkAuth(context)

  const newPost = new Post({
    body,
    user: user.id,
    username: user.username,
    createdAt: new Date().toISOString(),
    likes: [],
    comments: []
  })

  const post = await newPost.save()

  pubsub.publish('NEW_POST', {
    newPost: post
  })

  return post
}

module.exports = createPost
