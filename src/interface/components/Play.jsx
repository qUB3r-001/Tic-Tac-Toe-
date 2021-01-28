import React from "react";
import Button from "@material-ui/core/Button";
import FaceIcon from "@material-ui/icons/Face";
import ComputerIcon from "@material-ui/icons/Computer";

function Play(props) {
  return (
    <Button
      variant="contained"
      onClick={props.handleToggle}
      className={`mx-4 ${
        props.type === "1v1" ? "play-buttons-r" : "play-buttons-b"
      }`}
    >
      {props.type === "1v1" ? (
        <React.Fragment>
          <FaceIcon fontSize="large" />
          <span className="mx-2 font">Vs</span>
          <FaceIcon fontSize="large" />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <FaceIcon fontSize="large" />
          <span className="mx-2 font">Vs</span>
          <ComputerIcon fontSize="large" />
        </React.Fragment>
      )}
    </Button>
  );
}

export default Play;
