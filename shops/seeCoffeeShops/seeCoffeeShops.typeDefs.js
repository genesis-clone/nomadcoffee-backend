import { gql } from "apollo-server";

export default gql`
type SeeCoffeeShopsResult {
  ok: Boolean!
  error: String
  coffeeShops: [CoffeeShop]
  totalPages: Int
}
  type Query {
    seeCoffeeShops(page: Int!): SeeCoffeeShopsResult!
  }
`;