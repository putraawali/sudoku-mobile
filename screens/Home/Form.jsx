import React, { createRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import ActionSheet from "react-native-actions-sheet";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function Form({ navigation }) {
  const actionSheetRef = createRef();
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [validationName, setValidationName] = useState(true);
  const [validationDifficulty, setValidationDifficulty] = useState(true);

  function picker(value) {
    setDifficulty(value);
    actionSheetRef.current?.setModalVisible(false);
  }

  function play() {
    if (!difficulty && !name) {
      setValidationDifficulty(false);
      setValidationName(false);
    }
    if (!name && difficulty) {
      setValidationDifficulty(true);
      setValidationName(false);
    }
    if (!difficulty && name) {
      setValidationDifficulty(false);
      setValidationName(true);
    }
    if (difficulty && name) {
      navigation.navigate("MainContent", {
        difficulty,
        name,
      });
    }
  }

  return (
    <>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={"Input your name"}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        {!validationName && (
          <Text style={styles.validationMessage}>Name is required!</Text>
        )}
        <Text style={{ color: "#f4d160", fontSize: 17, marginTop: 20 }}>
          Level
        </Text>
        <TouchableOpacity
          onPress={() => {
            actionSheetRef.current?.setModalVisible();
          }}
        >
          <TextInput
            value={difficulty}
            style={{ ...styles.input, marginVertical: 6 }}
            editable={false}
            placeholder="Choose level"
          />
        </TouchableOpacity>
        {!validationDifficulty && (
          <Text style={styles.validationMessage}>Level is required!</Text>
        )}
        <ActionSheet ref={actionSheetRef}>
          <TouchableOpacity onPress={() => picker("Easy")}>
            <View style={styles.picker}>
              <Text style={{ fontSize: 30 }}>Easy</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => picker("Medium")}>
            <View style={styles.picker}>
              <Text style={{ fontSize: 30 }}>Medium</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => picker("Hard")}>
            <View style={styles.picker}>
              <Text style={{ fontSize: 30 }}>Hard</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => picker("Random")}>
            <View style={styles.picker}>
              <Text style={{ fontSize: 30 }}>Random</Text>
            </View>
          </TouchableOpacity>
        </ActionSheet>
      </View>
      <View style={{ ...styles.inputContainer, marginVertical: 25 }}>
        <TouchableOpacity onPress={() => play()}>
          <View style={styles.button}>
            <Icon name="brain" size={18}></Icon>
            <Text>Lets Play!</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 2,
    alignItems: "center",
  },
  input: {
    borderColor: "black",
    backgroundColor: "#fbeeac",
    borderWidth: 1,
    borderRadius: 4,
    width: 200,
    height: 35,
    textAlign: "center",
    fontSize: 18,
  },
  button: {
    display: "flex",
    height: 60,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    backgroundColor: "#f4d160",
    borderRadius: 2,
    marginTop: 16,
  },
  picker: {
    display: "flex",
    textAlign: "center",
    alignItems: "center",
    marginVertical: 6,
  },
  validationMessage: {
    textAlign: "center",
    color: "#ff6363",
    fontSize: 14,
  },
});
