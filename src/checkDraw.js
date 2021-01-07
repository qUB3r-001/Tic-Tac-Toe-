function checkDraw(board) {
  var count = 0;
  for (var i = 0; i < 9; i++) {
    if (board[i] !== null) {
      count++;
    }
  }
  return count === 9 ? true : false;
}

export default checkDraw;
