import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

export default function Loading() {
  return (
    <View style={styles.container}>
      <View style={styles.loadingContainer}>
        <Text style={styles.loading}>Preparing sugoku board</Text>
        <Text style={styles.loading}>Please wait...</Text>
        <ActivityIndicator size="large" color="#f4d160" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "6%",
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f4d160",
  },
});
