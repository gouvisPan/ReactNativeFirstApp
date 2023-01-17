import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import Auth from "./screens/auth/Auth";
import Home from "./screens/Home/Home";
import Profile from "./screens/Profile/Profile";
import Statistics from "./screens/Statistics/Statistics";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colorPrimary } from "./appStyles/appStyles";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { authActions } from "./store/reducers/authSlice";
import { userActions } from "./store/reducers/userSlice";
import { logoutUser } from "./store/actions/auth-actions";

const Tab = createBottomTabNavigator();

const authName = "Auth";
const homeName = "Home";
const statisticsName = "Statistics";
const profileName = "Profile";

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(authActions.autoLoginUser());
      } else {
        dispatch(authActions.setLoginStatus(false));
        dispatch(userActions.autoLoginUser(null));
      }
    });
  }, [dispatch]);

  return (
    <>
      <NavigationContainer>
        {isAuthenticated ? (
          <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({ route }) => ({
              tabBarActiveTintColor: colorPrimary,
              tabBarInactiveTintColor: "grey",
              tabBarLabelStyle: {
                paddingBottom: 2,
                fontSize: 12,
              },
              tabBarStyle: [
                {
                  display: "flex",
                },
                null,
              ],
              tabBarIcon: ({ focused, color, size }) => {
                let iconName = "";
                let rn = route.name;

                if (rn === homeName) {
                  iconName = focused ? "home" : "home-outline";
                } else if (rn === statisticsName) {
                  iconName = focused ? "list" : "list-outline";
                } else if (rn === profileName) {
                  iconName = focused ? "settings" : "settings-outline";
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
          >
            <Tab.Screen name={homeName} component={Home} />
            <Tab.Screen name={statisticsName} component={Statistics} />
            <Tab.Screen name={profileName} component={Profile} />
          </Tab.Navigator>
        ) : (
          <Stack.Navigator>
            <Tab.Screen name={authName} component={Auth} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </>
  );
};

export default Navigation;
