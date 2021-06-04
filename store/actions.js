/* FROM DOCUMENTATION - START */
const encodeBoard = (board) =>
  board.reduce(
    (result, row, i) =>
      result +
      `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? "" : "%2C"}`,
    ""
  );

const encodeParams = (params) =>
  Object.keys(params)
    .map((key) => key + "=" + `%5B${encodeBoard(params[key])}%5D`)
    .join("&");

/* FROM DOCUMENTATION - END */
export const resetGame = () => {
  return { type: "sugoku/resetAll" };
};

export const resetStatus = () => {
  return { type: "sugoku/resetStatus" };
};

export const leaderboard = (payload) => {
  return { type: "sugoku/leaderboard", payload };
};

const getBoard = (payload) => {
  return { type: "sugoku/getBoard", payload };
};

export const getBoardAsync = (difficulty) => {
  difficulty = difficulty.toLowerCase();
  return (dispatch) => {
    fetch(`https://sugoku.herokuapp.com/board?difficulty=${difficulty}`)
      .then((res) => {
        if (res.ok) return res.json();
        else throw res;
      })
      .then(({ board }) => dispatch(getBoard(board)))
      .catch(console.log);
  };
};

const validateBoard = (payload) => {
  return { type: "sugoku/validateBoard", payload };
};

export const validateBoardAsync = (data) => {
  return (dispatch) => {
    fetch("https://sugoku.herokuapp.com/validate", {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      body: encodeParams(data),
    })
      .then((res) => {
        if (res.ok) return res.json();
        else throw res;
      })
      .then(({ status }) => dispatch(validateBoard(status)))
      .catch((err) => err.json().then((body) => console.log(body)));
  };
};

const solveBoard = (payload) => {
  return { type: "sugoku/solve", payload };
};

export const solveBoardAsync = (data) => {
  return (dispatch) => {
    fetch("https://sugoku.herokuapp.com/solve", {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      body: encodeParams(data),
    })
      .then((res) => {
        if (res.ok) return res.json();
        else throw res;
      })
      .then((data) => dispatch(solveBoard(data)))
      .catch(console.log);
  };
};
