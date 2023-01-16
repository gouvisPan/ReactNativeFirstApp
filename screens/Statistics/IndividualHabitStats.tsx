import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { HabitStatistics } from "../../model/interfaces/HabitStatistics";
import { LinearGradient } from "expo-linear-gradient";
import {
  colorGreyDarker,
  colorGreyLight,
  colorGreyLighter,
} from "../../appStyles/appStyles";

interface IndividualHabitStatsProps {
  habitStats: HabitStatistics;
}

const IndividualHabitStats = ({ habitStats }: IndividualHabitStatsProps) => {
  const normalizedPerc =
    (habitStats.currentPercentage * 100) / habitStats.consistensyGoal;

  return (
    <View style={s.row}>
      <View style={s.goal}>
        <LinearGradient
          colors={["#20C997", "#00AD9C", "#009598", "#007A8B"]}
          style={[
            s.gradient,
            { width: `${normalizedPerc}%`, maxWidth: `100%` },
          ]}
        ></LinearGradient>
      </View>
      <View style={s.content}>
        <Text>{habitStats.name}</Text>
      </View>
    </View>
  );
};

export default IndividualHabitStats;

const s = StyleSheet.create({
  row: {
    backgroundColor: colorGreyLighter,
    marginTop: 20,
    height: 50,
    marginRight: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
  },
  goal: {},
  gradient: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
  },
  content: {
    paddingLeft: 10,
    display: "flex",
    flexDirection: "row",
    transform: [{ translateX: 0 }, { translateY: -35 }],
  },
});
