import { StyleSheet } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {} from "../../store/actions/user-actions";
import { colorPrimary } from "../../appStyles/appStyles";

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { userActions } from "../../store/reducers/userSlice";
import Notification from "../../components/Notification";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

interface MyFormValues {
  email: string;
  password: string;
}

const Auth = () => {
  const isSignIn = useAppSelector((state) => state.ui.isSignIn);
  const error = useAppSelector((state) => state.auth.error);
  const [isErrorDisplaying, setIsErrorDisplaying] = useState(false);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    console.log(error);
    if (error) {
      setIsErrorDisplaying(true);
      const timer = setTimeout(() => {
        setIsErrorDisplaying(false);
        dispatch(userActions.clearErrorState());
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [error, dispatch]);
  const mountedJSX = isSignIn ? <SignIn /> : <SignUp />;

  return (
    <>
      {mountedJSX}
      {error && isErrorDisplaying && <Notification message={error} />}
    </>
  );
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
