import { gql } from "apollo-server";

export default gql`
  type User {
    id: String!
    username: String!
    name: String!
    email: String!
    location: String
    avatarURL: String
    githubUsername: String
  }
  type Answer {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createAccount(
      username: String!
      name: String!
      email: String!
      password: String!
      location: String
      avatarURL: String
      githubUsername: String
    ): Answer 
  }
  type Query {
    seeProfile(username: String!): User
  }
`;