const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./schema/types');
const { Query } = require('./resolvers/github');

const resolvers = {
	Query
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: {}
});

server
	.listen({
		port: 5100,
	})
	.then(({ url }) => console.log(`Apollo server started ${url}`));