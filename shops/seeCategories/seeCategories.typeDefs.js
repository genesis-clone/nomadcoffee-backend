import { gql } from "apollo-server";

export default gql`
type SeeCategoriesResult{
  ok: Boolean!
  error: String
  categories: [Category]
  totalPages: Int
}
  type Query {
    seeCategories(page: Int!): SeeCategoriesResult!
  }
`;
