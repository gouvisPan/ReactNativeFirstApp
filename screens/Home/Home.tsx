import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Dashboard from "./Dashboard";
import AddHabitForm from "./AddHabitForm";
import { colorGreyWhite, colorPrimary } from "../../appStyles/appStyles";
import { useAppDispatch } from "../../hooks/hooks";
import { renewWeeklyState } from "../../store/actions/habit-actions";

const Home = () => {
  const navigation = useNavigation();
  const dispatcher = useAppDispatch();

  const clickNewWeekHandler = () => {
    dispatcher(renewWeeklyState());
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      <SafeAreaView style={s.homeCon}>
        <Dashboard />
        <TouchableOpacity
          style={s.renewCon}
          onPress={() => clickNewWeekHandler()}
        >
          <Text style={s.renewTxt}>Renew Week</Text>
        </TouchableOpacity>
        <AddHabitForm />
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default Home;

const s = StyleSheet.create({
  homeCon: {
    display: "flex",
    flexDirection: "column",
  },
  signOut: {
    position: "absolute",
    top: 25,
    right: 0,
  },
  renewCon: {
    backgroundColor: colorPrimary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    borderRadius: 20,
    width: 140,
    height: 30,
    zIndex: 5,
    bottom: "30%",
    left: "50%",
    transform: [{ translateX: -70 }, { translateY: 15 }],
  },
  renewTxt: {
    color: colorGreyWhite,
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.8,
  },
});
