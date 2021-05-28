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
`;