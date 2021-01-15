import { useEffect, useState } from "react";
import Box from "./Box";
import Stats from "./Stats";
import { calculateWinner, checkDraw } from "../winner";
//////////////   1 V 1 /////////////////////
function App1v1() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(Math.random() > 0.5);
  const winner = calculateWinner(board);
  const draw = checkDraw(board);
  const headingStyle = `text-center ${
    winner !== null ? (winner === "X" ? "redX" : "blueO") : null
  }`;
  const heading =
    winner === null ? (draw ? "Draw" : "Tic-Tac-Toe") : "Won " + winner;

  function onClick(id) {
    if (board[id] === null) {
      setBoard((curBoard) => {
        return winner === null
          ? [
              ...curBoard.slice(0, id),
              xTurn ? "X" : "O",
              ...curBoard.slice(id + 1),
            ]
          : curBoard;
      });
      setXTurn((currXTurn) => !currXTurn);
    }
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-6 pt-5">
          <Stats
            heading={heading}
            headingStyle={headingStyle}
            winner={winner}
            draw={draw}
            xTurn={xTurn}
            mode="1 V 1"
          />
        </div>
        <div className="col-6">
          <div className="background">
            {board.map((curBox, i) => (
              <Box key={i} id={i} onClick={onClick} value={curBox} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/////////////////////////// 1 V bot (random)///////////////////////
function AppAi() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(false);
  const [compTurn, setCompTurn] = useState(false);
  const winner = calculateWinner(board);
  const draw = checkDraw(board);
  const headingStyle = `text-center ${
    winner !== null ? (winner === "X" ? "redX" : "blueO") : null
  }`;
  const heading =
    winner === null ? (draw ? "Draw" : "Tic-Tac-Toe") : "Won " + winner;

  function onDraw(id) {
    if (board[id] === null) {
      setBoard((curBoard) => {
        return winner === null
          ? [
              ...curBoard.slice(0, id),
              xTurn ? "X" : "O",
              ...curBoard.slice(id + 1),
            ]
          : curBoard;
      });
      setXTurn((currXTurn) => !currXTurn);
      setCompTurn((currCompTurn) => !currCompTurn);
    }
  }

  useEffect(() => {
    const newOutput = board.map((box, index) => {
      return box === null ? index : -1;
    });
    const possiblePlay = newOutput.filter((output) => {
      return output !== -1;
    });
    const compId =
      possiblePlay[Math.floor(Math.random() * possiblePlay.length)];

    if (compTurn) {
      onDraw(compId);
    }
  });

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-6 pt-5 text-center">
          <Stats
            heading={heading}
            headingStyle={headingStyle}
            winner={winner}
            draw={draw}
            xTurn={xTurn}
            mode="Player Vs Bot"
          />
        </div>
        <div className="col-6">
          <div className="background">
            {board.map((curBox, i) => (
              <Box key={i} id={i} onClick={onDraw} value={curBox} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

////////////////////////////// 1 v AiP //////////////////////////////////
function AppAiP() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(false);
  const [compTurn, setCompTurn] = useState(false);
  const winner = calculateWinner(board);
  const draw = checkDraw(board);
  const headingStyle = `text-center ${
    winner !== null ? (winner === "X" ? "redX" : "blueO") : null
  }`;
  const heading =
    winner === null ? (draw ? "Draw" : "Tic-Tac-Toe") : "Won " + winner;

  function onDraw(id) {
    if (board[id] === null) {
      setBoard((curBoard) => {
        return winner === null
          ? [
              ...curBoard.slice(0, id),
              xTurn ? "X" : "O",
              ...curBoard.slice(id + 1),
            ]
          : curBoard;
      });
      setXTurn((currXTurn) => !currXTurn);
      setCompTurn((currCompTurn) => !currCompTurn);
    }
  }

  useEffect(() => {}); ///////////implement the bot turn call function

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-6 pt-5 text-center">
          <Stats
            heading={heading}
            headingStyle={headingStyle}
            winner={winner}
            draw={draw}
            xTurn={xTurn}
            mode="Player Vs Bot"
          />
        </div>
        <div className="col-6">
          <div className="background">
            {board.map((curBox, i) => (
              <Box key={i} id={i} onClick={onDraw} value={curBox} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export { App1v1, AppAi, AppAiP };
