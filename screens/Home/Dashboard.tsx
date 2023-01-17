import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { removeHabit } from "../../store/actions/habit-actions";
import Ionicons from "react-native-vector-icons/Ionicons";
import AddHabitsPrompt from "./AddHabitsPrompt";
import { LinearGradient } from "expo-linear-gradient";
import HabitRow from "./HabitRow";
import { useSwipe } from "../../hooks/useSwipe";
import { colorGreyWhite } from "../../appStyles/appStyles";
import { uiActions } from "../../store/reducers/ui-slice";

const Dashboard = () => {
  const habits = useAppSelector((state) => state.habits.habitList!);
  const dispatch = useAppDispatch();
  const isListEmpty = useAppSelector((state) => state.ui.isHabitListEmpty);
  // const isListEmpty = true;
  const currentHabitIndex = useAppSelector((state) => state.ui.currentIndex);

  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6);

  function onSwipeLeft() {
    dispatch(uiActions.increaseIndex(habits.length));
  }
  function onSwipeRight() {
    dispatch(uiActions.decreaseIndex());
  }
  const deleteHandler = (id: string) => {
    dispatch(removeHabit(id));
  };

  return (
    <View style={s.dash}>
      {!isListEmpty ? (
        <LinearGradient
          colors={["#20C997", "#00AD9C", "#009598", "#007A8B"]}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <View style={s.dashboard}>
            <Text style={s.title}>{habits[currentHabitIndex].name}</Text>
            <TouchableOpacity
              style={s.deleteCon}
              onPress={() => deleteHandler(habits[currentHabitIndex].id)}
            >
              <Ionicons
                name="close-circle-outline"
                size={35}
                color={colorGreyWhite}
              />
            </TouchableOpacity>

            <View style={s.week}>
              <HabitRow habit={habits[currentHabitIndex]} />
            </View>
          </View>
        </LinearGradient>
      ) : (
        <AddHabitsPrompt />
      )}
    </View>
  );
};

export default Dashboard;

const s = StyleSheet.create({
  dash: {
    height: "70%",

    // paddingHorizontal: 10,
  },
  dashboard: {
    display: "flex",
    paddingBottom: 10,
    paddingTop: 28,
    height: "100%",
    borderRadius: 40,
  },
  title: {
    color: colorGreyWhite,
    marginBottom: 15,
    fontSize: 22,
    fontWeight: "700",
    alignSelf: "center",
  },
  week: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  saticDayCon: {
    height: 32,
    paddingLeft: 8,
    marginRight: 40,
    marginBottom: 10,
    display: "flex",
    justifyContent: "center",
  },
  saticDay: {
    color: colorGreyWhite,
    letterSpacing: 1,
    fontSize: 16,
    fontWeight: "500",
  },
  deleteCon: {
    position: "absolute",
    top: 10,
    right: 6,
  },
});
