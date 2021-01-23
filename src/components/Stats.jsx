import React from "react";
// import Play from "./Play";

function Stats({ heading, headingStyle, winner, draw, xTurn, mode }) {
  return (
    <React.Fragment>
      <h1 className={headingStyle}>{heading}</h1>
      <h2 className="text-center mt-5">{mode}</h2>
      <h2 className={`text-center mt-1`}>
        Player:{" "}
        {winner === null && draw === false ? (xTurn ? "X" : "O") : "GAME OVER"}
      </h2>

      {/* <Play /> */}
    </React.Fragment>
  );
}

export default Stats;
