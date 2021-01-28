import Box from "./Box";

function Board({ board, onDraw, curBox }) {
  return (
    <div className="col-6">
      <div className="background">
        {board.map((curBox, i) => (
          <Box key={i} id={i} onClick={onDraw} value={curBox} />
        ))}
        <div className="playing-board">
          <div className="v-blocks"></div>
          <div className="h-blocks"></div>
        </div>
      </div>
    </div>
  );
}

export default Board;
