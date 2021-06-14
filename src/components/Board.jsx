// The box (one 1 of 9) which detects click to draw the symbol
function Box({ id, onClick, value }) {
  const XorOStyles = `border-0 ${value === "X" ? "red" : "green"}`;

  return (
    <div className="box text-center border-0">
      <button
        className={XorOStyles}
        id={id}
        onClick={() => {
          return onClick(id);
        }}
        value={value}
      >
        {value}
      </button>
    </div>
  );
}

// The complete board which contains 9 boxes and where the game is played out
function Board({ board, onDraw, start, winnerPos, winner }) {
  //The line draw after someone has won
  const winLineStyles = `winning-line ${
    winner === "X" ? "win-line-col-r" : "win-line-col-g"
  }`;

  return (
    <div className="position-relative">
      <div className={winLineStyles} style={winnerPos}></div>
      <div className="background">
        {board.map((curBox, i) => (
          <Box key={i} id={start ? i : null} onClick={onDraw} value={curBox} />
        ))}

        <div id="v-blocks"></div>
        <div id="h-blocks"></div>
      </div>
    </div>
  );
}

export default Board;
