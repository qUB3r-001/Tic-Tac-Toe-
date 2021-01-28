import { useState } from "react";
import Board from "../components/Board";
import Stats from "../components/Stats";
import { calculateWinner, checkDraw } from "../../logics/winner";

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

  function resetGame() {
    setBoard(Array(9).fill(null));
    setXTurn(false);
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-6 pt-1">
          <Stats
            heading={heading}
            headingStyle={headingStyle}
            winner={winner}
            draw={draw}
            xTurn={xTurn}
            mode="Player Vs Player"
            reset={resetGame}
          />
        </div>
        <Board board={board} onDraw={onClick} curBox={xTurn} />
      </div>
    </div>
  );
}

export default App1v1;
