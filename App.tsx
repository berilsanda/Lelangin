import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import MainNavigator from "./src/navigations/MainNavigator";
import { colors } from "src/data/globals";
import { Provider } from "react-redux";
import store from "src/reduxs/store";

export default function App() {
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.surface,
    },
  };

  return (
    <Provider store={store}>
      <NavigationContainer theme={navTheme}>
        <StatusBar style="auto" />
        <MainNavigator />
      </NavigationContainer>
    </Provider>
  );
}
