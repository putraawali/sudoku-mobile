import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useTimer from "../../hooks/useTimer.js";
import Loading from "../../components/Loading.jsx";
import TopMenu from "../../components/TopMenu";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  getBoardAsync,
  solveBoardAsync,
  validateBoardAsync,
  resetStatus,
} from "../../store/actions";
import Board from "./Board.jsx";
import Modals from "./Modals.jsx";

function MainContent({ route, navigation }) {
  const { difficulty, name } = route.params;
  const dispatch = useDispatch();
  const board = useSelector((state) => state.board);
  const solvedBoard = useSelector((state) => state.solvedBoard);
  const isLoading = useSelector((state) => state.isLoading);
  const status = useSelector((state) => state.status);
  const cheat = useSelector((state) => state.cheat);
  const [copyBoard, setCopyBoard] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSurrender, setIsSurrender] = useState(false);
  const [modalValidate, setModalValidate] = useState(false);
  const [firstFetch, setFirstFetch] = useState(true);
  const [firstCheat, setFirstCheat] = useState(true);
  const { time, interval } = useTimer();

  useEffect(() => {
    if (!isLoading && !cheat && !isSurrender && !status && firstFetch) {
      setCopyBoard(board);
      interval;
    } else if (status === "unsolved" || status === "broken") {
      setFirstFetch(false);
      setModalValidate(true);
      dispatch(resetStatus());
    } else if (status === "solved") {
      clearInterval(interval);
      navigation.replace("Result", { name, time });
    } else if (cheat && status !== "solved" && firstCheat) {
      setFirstFetch(false);
      setFirstCheat(false);
      setCopyBoard(solvedBoard);
    } else if (isSurrender) {
      clearInterval(interval);
      navigation.popToTop();
    } else if (firstFetch) {
      dispatch(getBoardAsync(difficulty));
    }
  }, [isLoading, cheat, status, isSurrender]);

  const submitSugoku = () => {
    dispatch(validateBoardAsync({ board: copyBoard }));
  };

  const autoSolve = () => {
    dispatch(solveBoardAsync({ board }));
  };

  function changeHandler(text, index, i) {
    if (typeof +text === typeof 1 && text > 0) {
      const cloneBoard = copyBoard.map((row) => row.map((col) => col));
      cloneBoard[index][i] = +text;
      if (cloneBoard[index][i] > 9) {
        cloneBoard[index][i] = cloneBoard[index][i] % 10;
      }
      setCopyBoard(cloneBoard);
    }
  }

  function surrender() {
    setModalVisible(!modalVisible);
    setIsSurrender(true);
  }

  if (isLoading || board === []) {
    return <Loading />;
  }

  return (
    <>
      <TopMenu navigation={navigation} />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.boardContainer}>
            <View style={styles.info}>
              <Text style={{ color: "#f4d160", fontSize: 16, marginBottom: 4 }}>
                {time}
              </Text>
              <Text style={{ color: "#f4d160", fontSize: 16, marginBottom: 4 }}>
                {name}
              </Text>
              <Text style={{ color: "#f4d160", fontSize: 16, marginBottom: 4 }}>
                {difficulty}
              </Text>
            </View>
            <Board
              board={board}
              changeHandler={changeHandler}
              copyBoard={copyBoard}
            />
          </View>
          <View style={styles.buttonGroup}>
            <TouchableOpacity onPress={submitSugoku}>
              <View style={{ ...styles.button, backgroundColor: "#f4d160" }}>
                <Text>Submit</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={autoSolve}>
              <View style={{ ...styles.button, backgroundColor: "#fbeeac" }}>
                <Text>Auto Solve</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <View style={{ ...styles.button, backgroundColor: "#ff6363" }}>
                <Text>Surrender</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Modals
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            surrender={surrender}
            modalValidate={modalValidate}
            setModalValidate={setModalValidate}
          />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
  },
  boardContainer: {
    flex: 3,
    justifyContent: "center",
    marginTop: 80,
  },
  info: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    display: "flex",
    height: 50,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  },
  buttonGroup: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 50,
  },
});

export default MainContent;
