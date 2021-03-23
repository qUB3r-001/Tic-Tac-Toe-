import { useCallback, useEffect, useRef, useState } from "react";
import Board from "../components/Board";
import Stats from "../components/Stats";
import { calculateWinner, checkDraw } from "../../logics/winner";
import Aimove from "../../logics/Aimove";

function AppAi() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(false);
  const [compTurn, setCompTurn] = useState(true);
  const winner = calculateWinner(board);
  const draw = checkDraw(board);
  const headingStyle = `text-center ${
    winner !== null ? (winner === "X" ? "redX" : "blueO") : null
  }`;
  const heading =
    winner === null ? (draw ? "Draw" : "Tic-Tac-Toe") : "Won " + winner;
  let optimumMove = useRef(0);

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
        optimumMove.current = id;
      }
    },
    [board, winner, xTurn]
  );

  function resetGame() {
    setBoard(Array(9).fill(null));
    setXTurn(false);
    setCompTurn(true);
  }

  useEffect(() => {
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
        <div className="col-6 pt-1 ">
          <Stats
            heading={heading}
            headingStyle={headingStyle}
            winner={winner}
            draw={draw}
            xTurn={xTurn}
            mode="Player Vs Bot"
            reset={resetGame}
            botMove={optimumMove.current}
          />
        </div>
        <Board board={board} onDraw={onDraw} curBox={xTurn} />
      </div>
    </div>
  );
}

export default AppAi;
