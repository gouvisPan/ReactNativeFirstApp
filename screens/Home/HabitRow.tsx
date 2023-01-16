import { View, StyleSheet, Button, TouchableOpacity, Text } from "react-native";
import React, { useState } from "react";
import { Habit } from "../../model/Habit";
import { useAppDispatch } from "../../hooks/hooks";
import { habitActions } from "../../store/reducers/habitSlice";
import { removeHabit } from "../../store/actions/habit-actions";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {
  colorGreyDark,
  colorGreyDarker,
  colorGreyLight,
  colorGreyLighter,
  colorGreyWhite,
  colorPrimary,
  colorPrimaryC,
  colorPrimaryCL,
} from "../../appStyles/appStyles";

const daysLong: string[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

interface HabitRowProps {
  habit: Habit;
}

const HabitRow = ({ habit }: HabitRowProps) => {
  const dispatch = useAppDispatch();

  const clickStateHandler = (i: number) => {
    const newState = [...habit.weeklyState];
    newState[i] = !habit.weeklyState[i];
    const newHabit = { ...habit };
    newHabit.weeklyState = newState;
    dispatch(habitActions.updateHabit(newHabit));
  };

  return (
    <View style={s.col}>
      {habit.weeklyState.map((d, i) => (
        <TouchableOpacity
          style={[s.checkbox, d ? s.checked : s.unChecked]}
          onPress={() => clickStateHandler(i)}
          key={i}
        >
          <Text style={d ? s.textChecked : s.text}>{daysLong[i]}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default HabitRow;

const s = StyleSheet.create({
  col: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    paddingHorizontal: 60,
  },
  checkbox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "10%",
    marginBottom: 11,
    borderRadius: 50,
  },
  text: {
    fontSize: 18,
    color: colorGreyDarker,
  },
  textChecked: {
    fontSize: 18,
    color: colorGreyWhite,
  },
  checked: {
    backgroundColor: colorPrimaryCL,
  },
  unChecked: {
    backgroundColor: colorGreyLighter,
  },
});
