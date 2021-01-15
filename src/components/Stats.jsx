import React from "react";
// import Play from "./Play";

function Stats({ heading, headingStyle, winner, draw, xTurn, mode }) {
  return (
    <React.Fragment>
      <h1 className={headingStyle}>{heading}</h1>
      <h2 className=" text-center mt-5">
        {winner === null && draw === false
          ? xTurn
            ? "Player : X"
            : "Player : O"
          : "GAME OVER"}
      </h2>
      <h2 className=" text-center mt-5">{mode}</h2>
      {/* <Play /> */}
    </React.Fragment>
  );
}

export default Stats;
