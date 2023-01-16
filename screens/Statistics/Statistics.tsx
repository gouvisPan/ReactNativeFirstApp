import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "../../hooks/hooks";
import { calculateHabitsStats } from "../../helpers/calculateHabitSats";
import IndividualHabitStats from "./IndividualHabitStats";
import {
  colorGrey,
  colorGreyBlack,
  colorGreyDark,
  colorGreyLighter,
  colorGreyWhite,
  colorPrimary,
  colorPrimaryCD,
  colorPrimaryLighter,
} from "../../appStyles/appStyles";

const Statistics = () => {
  const navigation = useNavigation();
  const habitsStats = useAppSelector((state) => calculateHabitsStats(state));

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={s.statisticsCon}>
      {habitsStats.length === 0 ? (
        <Text style={s.noHabits}>
          Please add a Habit in order to see its progress here!
        </Text>
      ) : (
        <>
          <View style={s.topOuter}>
            <View style={s.topInner}>
              <Text style={s.title}>Check your progress</Text>
              <Text style={s.info}>
                Each bar represents your performance-to-goal ratio!
              </Text>
            </View>
          </View>
          <ScrollView style={s.list}>
            {habitsStats?.map((stats) => (
              <IndividualHabitStats habitStats={stats} key={stats.id} />
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default Statistics;

const s = StyleSheet.create({
  noHabits: {},
  statisticsCon: {
    marginTop: 22,
    paddingTop: 15,
  },
  topInner: {
    backgroundColor: colorPrimary,
    paddingVertical: 5,
    marginHorizontal: 35,
    borderRadius: 30,
  },
  topOuter: {
    paddingVertical: 20,
    backgroundColor: colorPrimaryCD,
  },
  title: {
    fontSize: 25,
    alignSelf: "center",
    color: colorGreyWhite,
  },
  info: {
    fontSize: 12,
    alignSelf: "center",
    width: "50%",
    textAlign: "center",
    color: colorGreyWhite,
    lineHeight: 11,
    marginTop: 2,
  },
  list: {},
});
