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

  let winStyle = [
    { transform: "translateY(-150px)", animation: "grow 0.5s linear forwards" },
    { transform: "translateY(0)", animation: "grow 0.5s linear forwards" },
    { transform: "translateY(150px)", animation: "grow 0.5s linear forwards" },
    {
      transformOrigin: "left",
      transform: "translateY(-200px) translateX(50px) rotateZ(90deg)",
      animation: "grow 0.5s linear forwards",
    },
    {
      transformOrigin: "left",
      transform: "translateY(-200px) translateX(200px) rotateZ(90deg)",
      animation: "grow 0.5s linear forwards",
    },
    {
      transformOrigin: "left",
      transform: "translateY(-200px) translateX(350px) rotateZ(90deg)",
      animation: "grow 0.5s linear forwards",
    },
    {
      transformOrigin: "left",
      transform:
        "translateY(-190px) translateX(15px) rotateZ(45deg) scale(1.3)",
      animation: "grow 0.5s linear forwards",
    },
    {
      transformOrigin: "left",
      transform:
        "translateY(190px) translateX(15px) rotateZ(-45deg) scale(1.3)",
      animation: "grow 0.5s linear forwards",
    },
  ];

  for (var line = 0; line < 8; line++) {
    const [a, b, c] = lines[line];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], winStyle[line]];
    }
  }
  return [null, null];
}

function checkDraw(board) {
  var count = 0;
  let checkWinner = calculateWinner(board)[0];
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
  let testwinner = calculateWinner(board)[0];
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
