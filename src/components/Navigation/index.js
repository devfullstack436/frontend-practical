import { NavLink } from "react-router-dom";
import "../Navigation/navigation.scss";

const Navigation = ({ handleToggle, ...props }) => {
  return (
    <div className="navigation-bar">
      <NavLink to="/" onClick={handleToggle}>
        Main
      </NavLink>
      <NavLink to="/product" onClick={handleToggle}>
        Product
      </NavLink>
    </div>
  );
};
export default Navigation;
