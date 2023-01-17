import { StyleSheet, Text, View } from "react-native";
import React, { Component } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { colorGreyWhite } from "../../appStyles/appStyles";

export class AddHabitsPrompt extends Component {
  render() {
    return (
      <View style={s.container}>
        <LinearGradient
          colors={["#20C997", "#00AD9C", "#009598", "#007A8B"]}
          style={s.colors}
        >
          <Text style={s.text}>
            Please add your first habit to start tracking your progress!
          </Text>
        </LinearGradient>
      </View>
    );
  }
}

export default AddHabitsPrompt;

const s = StyleSheet.create({
  container: {
    height: "100%",
  },
  colors: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 19,
    color: colorGreyWhite,
  },
});
