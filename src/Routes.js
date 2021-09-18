import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Controlscreen from "./screens/Controlscreen";
import Homesrcreen from "./screens/Homesrcreen";
import { NavigationContainer } from "@react-navigation/native";
import { useStore } from "./store/store";
import {StatusBar} from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { setId } from "./store/actions";

export default function Routes() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer initialRouteName="Home" styles={styles.container}>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Homesrcreen} />
        <Stack.Screen name="Controls" component={Controlscreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100vh",
  },
});