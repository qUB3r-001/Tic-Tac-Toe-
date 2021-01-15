import Button from "@material-ui/core/Button";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

function Play(props) {
  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      onClick={props.handleToggle}
      className="mx-2"
    >
      {props.type}
      <PlayArrowIcon />
    </Button>
  );
}

export default Play;
