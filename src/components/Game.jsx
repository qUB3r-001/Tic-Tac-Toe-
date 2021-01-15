import React, { useState } from "react";
import { App1v1, AppAi, AppAiP } from "./App";
import Play from "./Play";

function Game() {
  const [mode, setMode] = useState("1");

  function toggle1v1() {
    setMode("1");
  }

  function toggle1vAI() {
    setMode("2");
  }

  function toggle1vAiP() {
    setMode("3");
  }
  return (
    <div className="board container-fluid">
      {mode === "1" ? <App1v1 /> : mode === "2" ? <AppAi /> : <AppAiP />}
      <Play handleToggle={toggle1v1} type="1v1" />
      <Play handleToggle={toggle1vAI} type="AI" />
      <Play handleToggle={toggle1vAiP} type="AiP" />
    </div>
  );
}

export default Game;
