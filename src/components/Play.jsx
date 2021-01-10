import Button from "@material-ui/core/Button";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

function Play() {
  return (
    <Button
      variant="contained"
      color="primary"
      disableElevation
      style={{
        width: "100px",
        height: "50px",
      }}
    >
      <PlayArrowIcon />
    </Button>
  );
}

export default Play;
