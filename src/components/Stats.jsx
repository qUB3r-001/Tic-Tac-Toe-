import Play from "./Play";

function Stats({ heading, headingStyle, winner, draw, xTurn }) {
  return (
    <div className="col-6 pt-5 text-center">
      <h1 className={headingStyle}>{heading}</h1>
      <h2 className="text-center mt-5">
        Player :{" "}
        {winner === null && draw === false ? (xTurn ? "X" : "O") : "--"}
      </h2>
      <Play />
    </div>
  );
}

export default Stats;
