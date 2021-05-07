function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (var line = 0; line < 8; line++) {
    const [a, b, c] = lines[line];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function checkDraw(board) {
  var count = 0;
  let checkWinner = calculateWinner(board);
  if (!checkWinner) {
    for (var i = 0; i < 9; i++) {
      if (board[i] !== null) {
        count++;
      }
    }
    return count === 9 ? true : false;
  }
}

function Aimove(board, player, depth) {
  let testwinner = calculateWinner(board);
  let testdraw = checkDraw(board);
  if (testwinner || testdraw) {
    let score;
    if (testwinner === "O") {
      score = 100 - depth;
    } else if (testwinner === "X") {
      score = depth - 100;
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

export { calculateWinner, checkDraw, Aimove };
