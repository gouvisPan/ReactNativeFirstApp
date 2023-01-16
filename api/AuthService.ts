import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  deleteUser,
} from "firebase/auth";

import SignUpCredentials from "../model/interfaces/SignupCredentials";
import SignInCredentials from "../model/interfaces/SignInCredentials";

export const signUpUser = (
  credentials: SignUpCredentials
): Promise<UserCredential> => {
  console.log(credentials);
  console.log(credentials);
  const response = createUserWithEmailAndPassword(
    auth,
    credentials.email,
    credentials.password
  );

  return response;
};

export const signInUser = (
  credentials: SignInCredentials
): Promise<UserCredential> => {
  const response = signInWithEmailAndPassword(
    auth,
    credentials.email,
    credentials.password
  );

  return response;
};

export const signOutUser = (): Promise<void> => {
  const response = signOut(auth);
  return response;
};

export const deleteUserAccount = async () => {
  const user = auth.currentUser;
  await deleteUser(user!);
};
