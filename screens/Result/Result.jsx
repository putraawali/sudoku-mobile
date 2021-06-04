import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useDispatch, useSelector } from "react-redux";
import { leaderboard, resetGame } from "../../store/actions";
import TopMenu from "../../components/TopMenu";

export default function Result({ route, navigation }) {
  const { name, time } = route.params;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(leaderboard({ name, time }));
  }, []);

  const goHome = () => {
    dispatch(resetGame());
    navigation.replace("Home");
  };
  const showLeaderboard = () => {
    dispatch(resetGame());
    navigation.navigate("Leaderboard");
  };

  return (
    <>
      <TopMenu navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Icon color="#fbeeac" name="trophy" size={60} />
          <Text style={{ ...styles.title, color: "#8ac4d0" }}>
            Congratulations
          </Text>
        </View>
        <View style={styles.bodyContainer}>
          <Text style={{ ...styles.title, color: "#f4d160" }}>{time}</Text>
          <Text style={{ ...styles.title, color: "#f4d160" }}>{name}</Text>
        </View>
        <View style={styles.footerContainer}>
          <TouchableOpacity onPress={() => goHome()}>
            <View style={styles.button}>
              <Icon name="home" size={18}></Icon>
              <Text>Home Screen</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showLeaderboard()}>
            <View style={styles.button}>
              <Icon name="crown" size={18}></Icon>
              <Text>Leaderboard</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
  },
  headerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
  },
  bodyContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  footerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    display: "flex",
    height: 60,
    width: 130,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    backgroundColor: "#f4d160",
    borderRadius: 2,
    marginHorizontal: 10,
  },
});
