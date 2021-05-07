import React, { useState } from "react";
import { App1v1, AppAi } from "./gameModes/1v1";
import PlayButtons from "./components/PlayButtons";

function Tictactoe() {
  const [mode, setMode] = useState("1");

  function toggle1v1() {
    setMode("1");
  }

  function toggle1vAI() {
    setMode("2");
  }

  return (
    <div className="board container-fluid p-5">
      {mode === "1" ? <App1v1 /> : <AppAi />}
      <div className="text-center col-6 p-3">
        <PlayButtons handleToggle={toggle1v1} type="1v1" />
        <PlayButtons handleToggle={toggle1vAI} type="AI" />
      </div>
    </div>
  );
}

export default Tictactoe;
