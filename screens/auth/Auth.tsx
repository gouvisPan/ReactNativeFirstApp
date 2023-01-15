import { StyleSheet } from "react-native";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {} from "../../store/actions/user-actions";
import { colorPrimary } from "../../appStyles/appStyles";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

interface MyFormValues {
  email: string;
  password: string;
}

const Auth = () => {
  const initialValues: MyFormValues = { email: "", password: "" };
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.user.isLoading);
  const isSignIn = useAppSelector((state) => state.ui.isSignIn);

  const mountedJSX = isSignIn ? <SignIn /> : <SignUp />;
  return <>{mountedJSX}</>;
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPrimary,
  },
  loginContainer: {
    width: "80%",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    elevation: 10,
  },
  textInput: {
    height: 40,
    width: "100%",
    margin: 10,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
});
