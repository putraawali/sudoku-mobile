import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const initialState = {
  board: [],
  solvedBoard: [],
  isLoading: true,
  status: "",
  cheat: false,
  leaderboard: [
    {
      name: "Dio",
      time: "06:47",
    },
    {
      name: "Tisa",
      time: "09:50",
    },
  ],
};
const reducers = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "sugoku/getBoard":
      return { ...state, board: payload, isLoading: false };
    case "sugoku/validateBoard":
      return { ...state, status: payload };
    case "sugoku/solve":
      return { ...state, solvedBoard: payload.solution, cheat: true };
    case "sugoku/resetAll":
      return {
        ...state,
        status: "",
        isLoading: true,
        board: [],
        cheat: false,
      };
    case "sugoku/resetStatus":
      return { ...state, status: "" };
    case "sugoku/leaderboard":
      return { ...state, leaderboard: state.leaderboard.concat(payload) };
    default:
      return state;
  }
};

const store = createStore(reducers, applyMiddleware(thunk));
export default store;
