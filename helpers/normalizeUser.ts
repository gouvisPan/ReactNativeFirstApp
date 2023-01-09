import { UserCredential } from "firebase/auth";
import User from "../model/User";

const normalIzeUser = (apiUser: UserCredential) => {
  const user: User = {
    name: apiUser.user.displayName,
    email: apiUser.user.email,
    id: apiUser.user.uid,
    authProvider: apiUser.user.providerId,
  };

  return user;
};

export default normalIzeUser;
