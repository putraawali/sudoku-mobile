import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import I from "react-native-vector-icons/Fontisto";
import { useRoute } from "@react-navigation/native";
function TopMenu({ navigation }) {
  const route = useRoute();

  function renderIcon() {
    if (route.name !== "MainContent") {
      return (
        <>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <I style={styles.icons} name="home" size={22} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Leaderboard")}>
            <Icon style={styles.icons} name="crown" size={22} />
          </TouchableOpacity>
        </>
      );
    }
  }

  return (
    <>
      <View style={styles.menuContainer}>
        <Text style={styles.appTitle}>Sugoku App</Text>
        <View style={styles.iconContainer}>{renderIcon()}</View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  menuContainer: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 5 : 0,
    display: "flex",
    marginHorizontal: "6%",
    flexDirection: "row",
  },
  appTitle: {
    fontSize: 22,
    fontWeight: "bold",
    flex: 1,
    color: "#f4d160",
  },
  iconContainer: {
    flex: 1,
    paddingVertical: "1.5%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  icons: {
    marginHorizontal: 13,
    color: "#f4d160",
  },
});
export default TopMenu;
