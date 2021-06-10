import { useEffect, useState } from "react";
import Board from "../components/Board";
import Stats from "../components/Stats";
import { calculateWinner, checkDraw, Aimove } from "../logics/winner";

function App1v1() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(Math.random() < 0.5 ? true : false);
  const [start, setStart] = useState(false);
  const [winner, winnerPos] = calculateWinner(board);
  const draw = checkDraw(board);

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
    }
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setXTurn(Math.random() < 0.5 ? true : false);
    setStart(false);
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-evenly align-items-center p-3">
        <Stats
          winner={winner}
          start={start}
          begin={setStart}
          draw={draw}
          xTurn={xTurn}
          mode="Player Vs Player"
          reset={resetGame}
        />
        <Board
          board={board}
          onDraw={onDraw}
          curBox={xTurn}
          start={start}
          winnerPos={winnerPos}
          winner={winner}
        />
      </div>
    </div>
  );
}

function AppAi() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(false);
  const [compTurn, setCompTurn] = useState(true);
  const [start, setStart] = useState(false);
  const [winner, winnerPos] = calculateWinner(board);
  const draw = checkDraw(board);

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

  function resetGame() {
    setBoard(Array(9).fill(null));
    setXTurn(false);
    setCompTurn(true);
    setStart(false);
  }

  useEffect(() => {
    if (start && compTurn) {
      let bestScore = -Infinity;
      let bestMove;
      let scores = [];
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          let copyBoard = board;
          copyBoard[i] = xTurn ? "X" : "O";
          let score = Aimove(copyBoard, xTurn, 0);
          copyBoard[i] = null;
          scores.push(score);
          if (score > bestScore) {
            bestScore = score;
            bestMove = i;
          }
        }
      }
      // console.log(scores, bestMove);

      setBoard((curBoard) => {
        return winner === null
          ? [
              ...curBoard.slice(0, bestMove),
              xTurn ? "X" : "O",
              ...curBoard.slice(bestMove + 1),
            ]
          : curBoard;
      });
      setXTurn((currXTurn) => !currXTurn);
      setCompTurn((currCompTurn) => !currCompTurn);
    }
  }, [board, compTurn, xTurn, winner, start]);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-evenly align-items-center p-3">
        <Stats
          winner={winner}
          draw={draw}
          xTurn={xTurn}
          start={start}
          begin={setStart}
          mode="Player Vs Bot"
          reset={resetGame}
        />
        <Board
          board={board}
          onDraw={onDraw}
          curBox={xTurn}
          start={start}
          winnerPos={winnerPos}
          winner={winner}
        />
      </div>
    </div>
  );
}

export { AppAi, App1v1 };
