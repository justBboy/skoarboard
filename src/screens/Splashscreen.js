import React from "react";
import { View, StyleSheet, Image } from "react-native";
const logo = require("../../assets/logo.png");

const Splashscreen = () => {
  return (
    <View style={styles.main}>
      <Image source={logo} style={{ width: 260, height: 100 }} />
    </View>
  );
};

export default Splashscreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    height: "100%",
    backgroundColor: "#222",
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
