import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import store from "./store";
import { View, StyleSheet, StatusBar } from "react-native";
import MainContent from "./screens/MainContent/MainContent.jsx";
import Home from "./screens/Home/Home";
import Result from "./screens/Result/Result";
import Leaderboard from "./screens/Leaderboard/Leaderboard";
export default function App() {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <NavigationContainer>
        <View style={styles.all}>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
              cardStyle: {
                backgroundColor: "#28527a",
              },
            }}
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="MainContent" component={MainContent} />
            <Stack.Screen name="Result" component={Result} />
            <Stack.Screen name="Leaderboard" component={Leaderboard} />
          </Stack.Navigator>
        </View>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  all: {
    backgroundColor: "#28527a",
    flex: 1,
  },
});
