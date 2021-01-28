import { calculateWinner, checkDraw } from "../logics/winner";

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

export default Aimove;
