import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
export default function Board(props) {
  const { changeHandler, copyBoard, board } = props;

  return (
    <>
      {copyBoard.map((row, index) => (
        <View key={index} style={styles.inputContainer}>
          {row.map((number, i) => (
            <View key={i}>
              <TextInput
                keyboardType="number-pad"
                style={
                  (i === 6 && index === 6) || (i === 6 && index === 3)
                    ? {
                        ...styles.input,
                        borderTopWidth: 3,
                        borderLeftWidth: 3,
                      }
                    : (i === 3 && index === 3) || (i === 3 && index === 6)
                    ? {
                        ...styles.input,
                        borderTopWidth: 3,
                        borderLeftWidth: 3,
                      }
                    : i === 6 || i === 3
                    ? { ...styles.input, borderLeftWidth: 3 }
                    : index === 6 || index === 3
                    ? { ...styles.input, borderTopWidth: 3 }
                    : styles.input
                }
                value={number ? `${number}` : ""}
                onChangeText={(text) => changeHandler(text, index, i)}
                editable={board[index][i] !== 0 ? false : true}
              />
            </View>
          ))}
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderColor: "black",
    backgroundColor: "#8ac4d0",
    borderWidth: 1,
    width: 35,
    height: 35,
    textAlign: "center",
    fontSize: 30,
  },
});
