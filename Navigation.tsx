import { View, Text } from "react-native";
import React , {useEffect}from "react";
import Home from "./screens/app/Home";
import SignIn from "./screens/auth/SignIn";
import SignUp from "./screens/auth/SignUp";
import Spinner from "./helpers/Spinner";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAppSelector } from "./hooks/hooks";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { useAppDispatch } from "./hooks/hooks";
import { userActions } from "./store/reducers/userSlice";
import normalIzeUser from "./helpers/normalizeUser";
import User from "./model/User";

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  const state = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      // dispatch(userActions.autoLoginUser(user))
  }else {
  }
  });
  return unsubscribe;
  },[])
  

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {state.isAuthenticated ? (
          <React.Fragment>
            <Stack.Screen name="Home" component={Home} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </React.Fragment>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
