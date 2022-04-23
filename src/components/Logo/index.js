import { Link } from "react-router-dom";
import Image from "../Image";
import "../Logo/logo.scss";

const Logo = ({ ...props }) => {
  return (
    <Link to="/" className="logo">
      <Image {...props} />
    </Link>
  );
};
export default Logo;
