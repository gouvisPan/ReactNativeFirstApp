import { View, Text } from "react-native";
import React from "react";
import Home from "./screens/app/Home";
import SignIn from "./screens/auth/SignIn";
import SignUp from "./screens/auth/SignUp";
import Spinner from "./helpers/Spinner";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAppSelector } from "./hooks/hooks";

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  const state = useAppSelector((state) => state.user);

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
