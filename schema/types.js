const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    hello: String
    repos(ownerName: String!): [Repo]!
	  details(filter: DetailsQuery!): Repodetails
  }

  type Repo {
    name: String
    size: Int
    owner: String
  }
	
	type Repodetails {
		name: String
		size: Int
		owner: String
		type: String
		files: Int
		content: String
		webhooks: String
	}
	
	input DetailsQuery {
		ownerName: String!
		repoName: String!
	}
`;

module.exports = typeDefs;