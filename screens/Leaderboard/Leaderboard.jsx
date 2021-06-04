import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useSelector } from "react-redux";
import TopMenu from "../../components/TopMenu";
export default function Leaderboard({ navigation }) {
  const headTable = ["Rank", "Name", "Time"];
  const leaderboard = useSelector((state) => state.leaderboard);
  const sortedLeaderoard = [...leaderboard];
  sortedLeaderoard.sort((a, b) => b.time > a.time);
  return (
    <>
      <TopMenu navigation={navigation} />
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Icon style={{ color: "#8ac4d0" }} name="crown" size={50} />
          <Text style={styles.title}>Leaderboard</Text>
        </View>
        <View style={styles.tableContainer}>
          <View style={styles.tableData}>
            {headTable.map((head, i) => (
              <View key={i} style={styles.table}>
                <Text style={{ fontWeight: "bold", color: "#fbeeac" }}>
                  {head}
                </Text>
              </View>
            ))}
          </View>
          {sortedLeaderoard.map((data, i) => {
            return (
              <View key={i} style={styles.tableData}>
                <View style={styles.table}>
                  <Text style={{ fontWeight: "bold", color: "#fbeeac" }}>
                    {i + 1}
                  </Text>
                </View>
                <View style={styles.table}>
                  <Text style={{ fontWeight: "bold", color: "#fbeeac" }}>
                    {data.name}
                  </Text>
                </View>
                <View style={styles.table}>
                  <Text style={{ fontWeight: "bold", color: "#fbeeac" }}>
                    {data.time}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    // display: "flex",
    marginHorizontal: 20,
  },
  headerContainer: {
    marginTop: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#8ac4d0",
  },
  tableContainer: {
    display: "flex",
    alignSelf: "stretch",
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  tableData: {
    display: "flex",
    alignSelf: "stretch",
    flexDirection: "row",
  },
  table: {
    flex: 1,
    alignSelf: "stretch",
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "#8ac4d0",
    justifyContent: "center",
  },
});
