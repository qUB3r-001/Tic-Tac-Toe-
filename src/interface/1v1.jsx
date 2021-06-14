import { useEffect, useState } from "react";
import Board from "../components/Board";
import Stats from "../components/Stats";
import { calculateWinner, checkDraw, BotMove } from "../logics/game-logics";

//The player vs player component
function PvP() {
  const [board, setBoard] = useState(Array(9).fill(null)); //the game board as array of 9 blocks
  const [xTurn, setXTurn] = useState(Math.random() < 0.5 ? true : false); //the random starting peice state
  const [start, setStart] = useState(false); //state for start button, only after when players can make move
  const [winner, winnerPos] = calculateWinner(board);
  const draw = checkDraw(board);

  //To draw the symbol on which ever block is clicked based on the id
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

  // To reset the complete game and all states
  function resetGame() {
    setBoard(Array(9).fill(null));
    setXTurn(Math.random() < 0.5 ? true : false);
    setStart(false);
  }

  return (
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
  );
}

//The player vs bot component
// Bot always moves first else the game would always be a draw by moving in the centermost block
function PvBot() {
  const [board, setBoard] = useState(Array(9).fill(null)); //the game board as array of 9 blocks
  const [xTurn, setXTurn] = useState(false); //the starting state (bot always starts first)
  const [compTurn, setCompTurn] = useState(true); //The state defining that its Bot's turn
  const [start, setStart] = useState(false);
  const [winner, winnerPos] = calculateWinner(board);
  const draw = checkDraw(board);

  //To draw the symbol on which ever block is clicked based on the id
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

  // To reset the complete game and all states
  function resetGame() {
    setBoard(Array(9).fill(null));
    setXTurn(false);
    setCompTurn(true);
    setStart(false);
  }

  /*useEffect hook used by bot to make its turn by using the minimax
  function to calculate the best position to make the move.
  useEffect renders the component when there is a change in the passed parameters
  also it makes the changes first on render and the variables are updated instantly
  after render thus available for using after changes unlike useState*/

  useEffect(() => {
    if (start && compTurn) {
      let bestScore = -Infinity;
      let bestMove;
      let scores = [];
      //This loop is for going through all the block for all checking all possible games
      //unlike the for loops inside minimax which were used calculating the games from a given
      //condition and giving the best score for that
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          let copyBoard = board;
          copyBoard[i] = xTurn ? "X" : "O";
          let score = BotMove(copyBoard, xTurn, 0);
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
  );
}

export { PvP, PvBot };
