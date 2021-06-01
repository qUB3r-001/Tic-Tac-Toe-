import React, { useState } from "react";
import { App1v1, AppAi } from "./interface/1v1";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FaceIcon from "@material-ui/icons/Face";
import ComputerIcon from "@material-ui/icons/Computer";

function Tictactoe() {
  const [mode, setMode] = useState("1v1");
  const theme = createMuiTheme({
    overrides: {
      MuiButton: {
        root: {
          width: "180px",
          height: "70px",
          fontSize: "1.2em",
          borderRadius: "40px",
        },
      },
      MuiSvgIcon: {
        root: {
          margin: "0 5px",
        },
      },
    },
  });

  return (
    <div className="board p-5">
      {mode === "1v1" ? <App1v1 /> : <AppAi />}
      <div className="d-flex justify-content-center p-3">
        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            className="mx-4 play-button"
            onClick={() => setMode((currMode) => "1v1")}
            style={
              mode === "1v1"
                ? {
                    backgroundColor: "#ff1439",
                    boxShadow: "0 0 20px #ff1439",
                    opacity: 1,
                  }
                : null
            }
          >
            <FaceIcon fontSize="large" />
            VS
            <FaceIcon fontSize="large" />
          </Button>
          <Button
            variant="contained"
            className="mx-4 play-button"
            onClick={() => setMode((currMode) => "1vAi")}
            style={
              mode === "1vAi"
                ? {
                    backgroundColor: "#27b376",
                    boxShadow: "0 0 20px #27b376",
                    opacity: 1,
                  }
                : null
            }
          >
            <FaceIcon fontSize="large" />
            VS
            <ComputerIcon fontSize="large" />
          </Button>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default Tictactoe;
