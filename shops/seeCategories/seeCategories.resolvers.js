import client from "../../client";

export default {
  Query: {
    seeCategories: async(_, { page }) => {
      const categories = client.category.findMany({
        take: 5,
        skip: (page - 1) * 5,
      });
      if (!categories) {
        return {
          ok: false,
          error: "Cant not found categories"
        };
      }
      const totalCategories = await client.category.count();
      return {
        ok: true,
        categories,
        totalCategories: Math.ceil(totalCategories / 5)
      }
    }
  }
};