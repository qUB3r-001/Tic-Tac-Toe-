import React, { useEffect, useState } from "react";
import Fab from "@material-ui/core/Fab";
import ReplayIcon from "@material-ui/icons/Replay";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

function Stats({
  heading,
  headingStyle,
  winner,
  draw,
  xTurn,
  mode,
  reset,
  botMove,
  playerPick,
}) {
  const [value, setValue] = useState("X");

  function playerSelect(e) {
    setValue(e.target.value);
  }

  useEffect(() => {
    // console.log(value);
    if (mode === "Player Vs Player")
      value === "X" ? playerPick(true) : playerPick(false);
  }, [value, playerPick, mode]);

  return (
    <React.Fragment>
      <h1 className={headingStyle}>{heading}</h1>
      <h2 className="mode text-center">
        {winner === null && draw === false ? mode : ""}
      </h2>
      <div className="row mt-4">
        <div className="col-12 text-center px-0">
          <h2 className={`player-stat`}>
            {winner === null && draw === false
              ? xTurn
                ? " Player: X"
                : " Player: O"
              : "GAME OVER"}
          </h2>
          {(winner || draw) && (
            <Fab onClick={reset} className="reset">
              <ReplayIcon />
            </Fab>
          )}
        </div>
      </div>
      {mode === "Player Vs Player" && (
        <div class="row mt-4">
          <div class="col-12">
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="gender"
                name="player_select"
                onChange={playerSelect}
                value={value}
              >
                <FormControlLabel value="X" control={<Radio />} label="X" />
                <FormControlLabel value="O" control={<Radio />} label="O" />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default Stats;
