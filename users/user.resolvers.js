import client from "../client";

export default {
  User: {
    shops: ({ id }) => client.user.findUnique({ where: { id } }).shops(),
  },
};