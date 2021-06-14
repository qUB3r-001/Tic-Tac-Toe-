//All the logics used which include calculate the winner,
//check if its a draw and calculate the best move for bot to play
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

  //The styles and animation of the line drawn when a player wins
  let winLineStyle = [
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
      return [squares[a], winLineStyle[line]];
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

//Uses the MiniMax function to calculate best move
//The function plays out all possible conditions and gives score to each outcome
//based on the fact that which player is using the function i.e (player or bot)
//Winner of each possible game is given a positive score and based on that score
//Bot takes its turn.
function BotMove(board, player, depth) {
  //Here bot plays first and uses O as its peice
  let testwinner = calculateWinner(board)[0];
  let testdraw = checkDraw(board);

  //lowest in the recurssion i.e. when the winner is decided
  if (testwinner || testdraw) {
    let score;

    //using depth - (fix value) for determinig better move if there is a win condition in scenarios
    if (testwinner === "O") {
      score = 100 - depth; // positive score for bot if O is winner in that game
    } else if (testwinner === "X") {
      score = depth - 100; // negative score for bot if X is winner in that game
    } else {
      score = 0;
    }
    return score;
  }

  //The turn of the player wants to win always (i.e BOT)
  if (player) {
    let bestScore = -Infinity;
    //running through all the remaining places where the player(BOT) can make a turn
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        let copyBoard = board;
        copyBoard[i] = "O";
        //Calculate the score by calling the function again and updating a copy
        //of board and switching player
        let score = BotMove(copyBoard, !player, depth + 1);
        copyBoard[i] = null;
        //If score is better than before than select it
        if (score > bestScore) {
          bestScore = score;
        }
      }
    }
    return bestScore;
  } else {
    //The turn of the player whose win is undesired thus minimizing its score (i.e. Human)
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        let copyBoard = board;
        copyBoard[i] = "X";
        let score = BotMove(copyBoard, !player, depth + 1);
        copyBoard[i] = null;
        if (score < bestScore) {
          bestScore = score;
        }
      }
    }
    return bestScore;
  }
}

export { calculateWinner, checkDraw, BotMove };
