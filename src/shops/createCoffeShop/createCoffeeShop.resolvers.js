import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processCategories } from "../shops.utils";

export default {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (_, { name, latitude, longitude, categories }, { loggedInUser }) => {
        let categoryObj = [];
        if (categories) {
          categoryObj = processCategories(categories);
        }
        return client.coffeeShop.create({
          data: {
            name,
            latitude,
            longitude,
            user: {
              connect: {
                id: loggedInUser.id,
              }
            },
            ...(categoryObj.length > 0 && {
              categories: {
                connectOrCreate: categoryObj,
              },
            }),
          },
        });
      }
    ),
  },
};
