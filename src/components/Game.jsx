import React, { useState } from "react";
import { App1v1, AppAi } from "./App";
import Play from "./Play";
// import Switch from "@material-ui/core/Switch";

function Game() {
  const [mode, setMode] = useState("2");

  function toggle1v1() {
    setMode("1");
  }

  function toggle1vAI() {
    setMode("2");
  }

  // function toggle1vAiP() {
  //   setMode("3");
  // }
  return (
    <div className="board container-fluid">
      {mode === "1" ? <App1v1 /> : <AppAi />}
      <div className="text-center col-6 p-3">
        <Play handleToggle={toggle1v1} type="1v1" />
        <Play handleToggle={toggle1vAI} type="AI" />
        {/* <Switch
          color="primary"
          name="checkedB"
          inputProps={{ "aria-label": "primary checkbox" }}
        /> */}
      </div>
    </div>
  );
}

export default Game;
