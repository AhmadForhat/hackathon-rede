const { createServer } = require("http")
const { execute, subscribe } = require("graphql")
const { SubscriptionServer } = require("subscriptions-transport-ws")
const { makeExecutableSchema } = require("@graphql-tools/schema")
const express = require("express")
const { ApolloServer } = require("apollo-server-express")
const resolvers = require("./graphql/resolvers")
const typeDefs = require("./graphql/typesDefs")
const mongoose = require('mongoose')

const { MONGODB } = require('./config')

const serverStart = async () => {
  const app = express()

  const httpServer = createServer(app)

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  })

  const subscriptionServer = SubscriptionServer.create({
    schema,
    execute,
    subscribe,
  }, {
    server: httpServer,
  })

  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({ req }),
    plugins: [{
      async serverWillStart() {
        return {
          async drainServer() {
            subscriptionServer.close()
          }
        }
      }
    }],
  })
  await server.start()
  server.applyMiddleware({ app })

  const PORT = 4000
  httpServer.listen(PORT, () => console.log(`Server is now running on http://localhost:${PORT}/graphql`))
}

mongoose.connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('Connect database')
    return serverStart()
  })
