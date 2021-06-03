import { gql } from "apollo-server";

export default gql`
  type EditProfileResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      username: String
      name: String
      email: String
      password: String
      location: String
      avatarURL: String
      githubUsername: String
    ): EditProfileResult!
  }
`;