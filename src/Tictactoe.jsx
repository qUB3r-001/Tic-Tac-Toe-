import React, { useState } from "react";
import { PvP, PvBot } from "./interface/1v1";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FaceIcon from "@material-ui/icons/Face";
import ComputerIcon from "@material-ui/icons/Computer";

function Tictactoe() {
  //state to select gameplay mode
  const [mode, setMode] = useState("1v1");

  //Styles for the mode selection buttons from MaterialsUI
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

  //Highlight on selection of Button to indicate active mode
  const buttonStyles1v1 =
    mode === "1v1"
      ? {
          backgroundColor: "#ff1439",
          boxShadow: "0 0 20px #ff1439",
          opacity: 1,
        }
      : null;
  const buttonStyles1vAi =
    mode === "1vBot"
      ? {
          backgroundColor: "#27b376",
          boxShadow: "0 0 20px #27b376",
          opacity: 1,
        }
      : null;

  return (
    <div className="board p-3">
      {/* The component for both modes depending on which mode is selected */}
      {mode === "1v1" ? <PvP /> : <PvBot />}
      {/* The mode selection buttons */}
      <div className="d-flex justify-content-center p-3">
        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            className="mx-4 play-button"
            onClick={() => setMode((currMode) => "1v1")}
            style={buttonStyles1v1}
          >
            <FaceIcon fontSize="large" />
            VS
            <FaceIcon fontSize="large" />
          </Button>
          <Button
            variant="contained"
            className="mx-4 play-button"
            onClick={() => setMode((currMode) => "1vBot")}
            style={buttonStyles1vAi}
          >
            <FaceIcon fontSize="large" />
            VS
            <ComputerIcon fontSize="large" />
          </Button>
        </ThemeProvider>
      </div>
      {/* The footer text */}
      <div className="text-center footer-text">
        "In 1952 the EDSAC computer had an inbuilt game called OXO - a crude
        version of the table top classic now known as Tic-Tac-Toe making it the
        world's first ever video game"
        <br /> Made By - qUB3r
      </div>
    </div>
  );
}

export default Tictactoe;
