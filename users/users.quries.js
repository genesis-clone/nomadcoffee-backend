import client from "../client";

export default {
  Query: {
    seeProfile: async (_, { username }) => {
      const findUser = await client.user.findFirst({
        where: {
          username,
        },
      })
      return findUser
    }
  },
};
