import { StyleSheet } from "react-native";
import { colorGreyDark, colorGreyWhite, colorPrimary } from "./appStyles";

export const authStyles = StyleSheet.create({
  title: {
    fontSize: 28,
    alignSelf: "center",
    marginTop: 60,
    flexGrow: 0.15,
  },
  signCon: {
    marginTop: 32,
    backgroundColor: colorPrimary,
    paddingHorizontal: 10,
    paddingVertical: 7,
    width: "28%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 25,
  },
  questionTxt: {
    fontSize: 10,
    color: colorGreyDark,
    marginBottom: 18,
    letterSpacing: 0.1,
    textAlign: "center",
  },
  signTxt: {
    fontSize: 20,
    fontWeight: "600",
    color: colorGreyWhite,
  },
  loading: {
    position: "absolute",
    bottom: 80,
    textAlign: "center",
  },
});
