import bcrypt from "bcrypt";
import client from "../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { username, name, email, location, password, avatarURL, githubUsername }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser) {
          throw new Error("This username/password is already taken.");
        }
        const uglyPassword = await bcrypt.hash(password, 10);
        const createUser = await client.user.create({
          data: {
            username,
            name,
            email,
            location,
            password: uglyPassword,
            avatarURL,
            githubUsername,
          },
        });
        if(!createUser) {
          throw new Error("Creating function has a problem")
        }
        return {
          ok: true
        }
      } catch (e) {
        return {
          ok: false,
          error: `${e}`
        }
      }
    },
  },
};
