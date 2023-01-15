import React from "react";
import Home from "./screens/app/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAppSelector } from "./hooks/hooks";
import Auth from "./screens/auth/Auth";

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <React.Fragment>
            <Stack.Screen name="Home" component={Home} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Stack.Screen name="Auth" component={Auth} />
          </React.Fragment>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
