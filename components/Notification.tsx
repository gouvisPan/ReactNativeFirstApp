import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colorGreyBlack, colorPrimaryLighter } from "../appStyles/appStyles";

interface NotificationProps {
  message: string | null;
}

const Notification = ({ message }: NotificationProps) => {
  return (
    <View style={s.notificationCon}>
      <Text style={s.notificationText}>{message}</Text>
    </View>
  );
};

export default Notification;

const s = StyleSheet.create({
  notificationCon: {
    zIndex: 10,
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: colorGreyBlack,
    height: 45,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  notificationText: {
    fontSize: 16,
    color: colorPrimaryLighter,
  },
});
