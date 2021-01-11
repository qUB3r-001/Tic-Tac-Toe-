import React, { useState } from "react";
import { App1v1, AppAi } from "./App";
import Play from "./Play";

function Game() {
  const [mode, setMode] = useState(true);

  function toggle() {
    setMode((curMode) => !curMode);
  }
  return (
    <React.Fragment>
      {mode ? <App1v1 /> : <AppAi />}
      <Play handleToggle={toggle} />
    </React.Fragment>
  );
}

export default Game;
