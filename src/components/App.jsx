import { useState } from "react";
import Box from "./Box";
import Stats from "./Stats";
import { calculateWinner, checkDraw } from "../winner";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(false);
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
    <div className="board container-fluid">
      <div className="row">
        <Stats
          heading={heading}
          headingStyle={headingStyle}
          winner={winner}
          draw={draw}
          xTurn={xTurn}
        />
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

export default App;
