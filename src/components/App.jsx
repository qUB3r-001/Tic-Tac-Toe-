import { useCallback, useEffect, useState } from "react";
import Board from "./Board";
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
        <Board board={board} onDraw={onClick} curBox={xTurn} />
      </div>
    </div>
  );
}

/////////////////////// 1 V bot (random)///////////////////////
function AppAi() {
  const [board, setBoard] = useState(Array(9).fill(null));

  //   ["X", "O","O",null, "X",null, null,null,"O"]     Array(9).fill(null)
  const [xTurn, setXTurn] = useState(false);
  const [compTurn, setCompTurn] = useState(true);
  const winner = calculateWinner(board);
  const draw = checkDraw(board);
  const headingStyle = `text-center ${
    winner !== null ? (winner === "X" ? "redX" : "blueO") : null
  }`;
  const heading =
    winner === null ? (draw ? "Draw" : "Tic-Tac-Toe") : "Won " + winner;

  const onDraw = useCallback(
    (id) => {
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
    },
    [board, winner, xTurn]
  );

  useEffect(() => {
    function Aimove(board, player, depth) {
      let testwinner = calculateWinner(board);
      let testdraw = checkDraw(board);
      if (testwinner || testdraw) {
        let score;
        if (testwinner === "O") {
          score = 10 - depth;
        } else if (testwinner === "X") {
          score = depth - 10;
        } else {
          score = 0;
        }
        return score;
      }

      if (player) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
          if (board[i] === null) {
            let copyBoard = board;
            copyBoard[i] = "O";
            let score = Aimove(copyBoard, !player, depth + 1);
            copyBoard[i] = null;
            if (score > bestScore) {
              bestScore = score;
            }
          }
        }
        return bestScore;
      } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
          if (board[i] === null) {
            let copyBoard = board;
            copyBoard[i] = "X";
            let score = Aimove(copyBoard, !player, depth + 1);
            copyBoard[i] = null;
            if (score < bestScore) {
              bestScore = score;
            }
          }
        }
        return bestScore;
      }
    }

    if (compTurn) {
      let bestScore = -Infinity;
      let bestMove;
      let scores = [];
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          let copyBoard = board;
          copyBoard[i] = "O";
          let score = Aimove(copyBoard, xTurn, 0);
          copyBoard[i] = null;
          scores.push(score);
          if (score > bestScore) {
            bestScore = score;
            bestMove = i;
          }
        }
      }
      console.log(scores, bestMove);
      onDraw(bestMove);
    }
  }, [board, compTurn, onDraw, xTurn]);

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
        <Board board={board} onDraw={onDraw} curBox={xTurn} />
      </div>
    </div>
  );
}

export { App1v1, AppAi };
