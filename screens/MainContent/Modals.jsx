import React from "react";
import { Modal, TouchableOpacity, Text, View, StyleSheet } from "react-native";
export default function Modals(props) {
  const {
    modalValidate,
    setModalValidate,
    modalVisible,
    setModalVisible,
    surrender,
  } = props;
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are your sure?</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={{ ...styles.button, backgroundColor: "#28527a" }}
                onPress={surrender}
              >
                <Text style={styles.textStyle}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.button, backgroundColor: "#ff6363" }}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalValidate}
        onRequestClose={() => {
          setModalValidate(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Oops, try again!</Text>
            <TouchableOpacity
              style={{ ...styles.button, backgroundColor: "#28527a" }}
              onPress={() => setModalValidate(false)}
            >
              <Text style={styles.textStyle}>Keep Playing</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#f4d160",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
  },
  buttonClose: {
    backgroundColor: "#28527a",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  button: {
    display: "flex",
    height: 50,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    marginHorizontal: 3,
  },
});
