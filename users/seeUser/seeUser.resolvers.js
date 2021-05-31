import client from "../../client"

export default {
  Query: {
    seeFollowers: async(_, { username, page }) => {
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!ok) {
        return {
          ok: false,
          error: "User not found",
        };
      }
      const followers = await client.user
        .findUnique({ where: { username } })
        .followers({
          take: 5,
          skip: (page - 1) * 5,
        });
        const totalFollowers = await client.user.count({
          where: { following: { some: { username } } },
        });
      return {
        ok: true,
        followers,
        totalPages: Math.ceil(totalFollowers / 5),
      };
    },
  },
  User: {
    totalFollowing: ({ id }) => 
      client.user.count({ 
        where: { 
          following: {
            some: { 
              id,
            },
          },
        },
      }),
    totalFollowers: ({ id }) => 
    client.user.count({ 
      where: { 
        followers: {
          some: { 
            id,
          },
        },
      },
    }),
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const exists = await client.user.count({
        where: {
          username: loggedInUser.username,
          following: {
            some: {
              id,
            },
          },
        },
      });
      return Boolean(exists);
    },
  },
};
