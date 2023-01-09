import { View, Text, Button } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch } from "../../hooks/hooks";
import { logoutUser } from "../../store/actions/user-actions";

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const onSignOutPressHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <SafeAreaView>
      <Text>homesss</Text>
      <Button title="SignOut" onPress={onSignOutPressHandler} />
    </SafeAreaView>
  );
};

export default Home;
