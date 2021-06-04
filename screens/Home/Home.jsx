import React, { useEffect } from "react";
import { ScrollView, View, Text, StyleSheet, Image } from "react-native";
import Form from "./Form";
import TopMenu from "../../components/TopMenu";
export default function Home({ navigation }) {
  return (
    <>
      <TopMenu navigation={navigation} />
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Sugoku</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../../assets/sudoku.png")}
          />
        </View>
        <Form navigation={navigation} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 6,
  },
  headerContainer: {
    marginTop: 20,
    display: "flex",
    alignItems: "center",
  },
  title: {
    color: "#8ac4d0",
    fontSize: 40,
    fontWeight: "bold",
  },
  imageContainer: {
    flex: 4,
    alignItems: "center",
  },
  image: {
    height: 300,
    width: 300,
  },
});
