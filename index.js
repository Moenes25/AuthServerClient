const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');


const pubsub = new PubSub();

const PORT = process.env.port || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

mongoose
  .connect('mongodb://localhost:27017/ali')
  .then(() => server.listen({ port: PORT }))
  .then((res) => {
  console.log(`server at runnig ${res.url}`);
  })
  .catch((err) => {

  });
