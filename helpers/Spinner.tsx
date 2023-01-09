import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import React from "react";

const Spinner = () => {
  return (
    <SafeAreaView style={styles.spinner}>
      <ActivityIndicator size="large" color="#00ff00" />
    </SafeAreaView>
  );
};

export default Spinner;

const styles = StyleSheet.create({
  spinner: {},
});
