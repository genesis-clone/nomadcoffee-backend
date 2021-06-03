import client from "../../client";

export default {
  Query: {
    seeCoffeeShops: async(_, { page }) => {
      const coffeeShops = client.coffeeShop.findMany({
        take: 5,
        skip: (page - 1) * 5,
      });
      if (!coffeeShops) {
        return {
          ok: false,
          error: "Cant not found coffee shop"
        };
      }
      const totalCoffeeShops = await client.coffeeShop.count();
      return {
        ok: true,
        coffeeShops,
        totalPages: Math.ceil(totalCoffeeShops / 5)
      }
    }
  }
};