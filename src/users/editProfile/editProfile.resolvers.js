import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";

const resolverFn = async (
  _,
  { username, name, email, password: newPassword, location, avatarURL},
  { loggedInUser }
) => {
  let uglyPassword = null;
  if (newPassword) {
    uglyPassword = await bcrypt.hash(newPassword, 10)
  }
  const updatedUser = await client.user.update({
    where:{
      id: loggedInUser.id,
    }, 
    data:{
      username, 
      name, 
      email, 
      ...(uglyPassword && { password: uglyPassword }), 
      location, 
      avatarURL, 
      githubUsername,
    },
  });
  if (updatedUser.id){
    return {
      ok: true
    };
  } else {
    return {
      ok: false,
      error: "Could not update profile."
    };
  } 
};

export default {
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
};
