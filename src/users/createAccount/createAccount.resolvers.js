import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { username, name, email, password, location, avatarURL, githubUsername }
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
        await client.user.create({
          data: {
            username,
            name,
            email,
            password: uglyPassword,
            location,
            avatarURL,
            githubUsername,
          },
        });
        return {
          ok: true
        }
      } catch (e) {
        return {
          ok: false,
          error: "Cant create account." 
        };
      }
    },
  },
};