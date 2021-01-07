import { useState } from "react";
import Box from "./Box";
import calculateWinner from "../winner";
import checkDraw from "../checkDraw";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(false);
  const winner = calculateWinner(board);
  const draw = checkDraw(board);

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
    <div className="pt-3">
      <h1
        className={`text-center ${
          winner !== null ? (winner === "X" ? "red" : "blue") : null
        }`}
      >
        {winner === null ? (draw ? "Draw" : "Tic-Tac-Toe") : "Won " + winner}
      </h1>
      <div className="background mt-5">
        {board.map((curBox, i) => (
          <Box key={i} id={i} onClick={onClick} value={curBox} />
        ))}
      </div>
    </div>
  );
}

export default App;
