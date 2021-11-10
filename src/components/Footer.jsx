import GitHubIcon from "@material-ui/icons/GitHub";
import EmailIcon from "@material-ui/icons/Email";

function Footer() {
  return (
    <div className="text-center footer-text mx-auto col-md-3 col-sm-4 mt-3">
      <div className="py-2">Made By - qUB3r</div>
      <hr className="m-0" />
      <div className="py-2 d-flex justify-content-center">
        <a href="https://github.com/qUB3r-001">
          <GitHubIcon className="mx-3" fontSize="small" />
        </a>
        <a href="mailto: sid25porwal@gmail.com">
          <EmailIcon className="mx-3" fontSize="small" />
        </a>
      </div>
    </div>
  );
}

export default Footer;
