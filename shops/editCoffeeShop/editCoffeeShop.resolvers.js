import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processCategories } from "../shops.utils";

export default {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (_, { id, categories }, { loggedInUser }) => {
        const oldShop = await client.coffeeShop.findFirst({
          where: {
            id,
            userId: loggedInUser.id,
          },
        },{
          include: {
            categories: {
              select: {
                name: true,
              },
            },
          },
        });
        if (!oldShop) {
          return {
            ok: false,
            error: "CoffeeShop not found.",
          };
        }
        const coffeeShop = await client.coffeeShop.update({
          where: {
            id,
          },
          data: {
            categories,
            categories: {
              disconnect: oldShop.categories,
              connectOrCreate: processCategories(categories),
            }
          },
        });
        console.log(coffeeShop);
      }
    ),
  },
};