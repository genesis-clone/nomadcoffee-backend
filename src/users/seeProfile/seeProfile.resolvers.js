import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Query: {
    seeProfile: protectedResolver((_, __, { loggedInUser }) => 
      client.user.findUnique({
        where: {
          username: loggedInUser.username,
        },
        include: {
          following: true,
          followers: true,
        },
      })
    ),
  },
};