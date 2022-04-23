import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Image from "../Image";
import "../Header/header.scss";
import MenuIcon from "../../images/white-menu.svg";
import Navigation from "../Navigation";
import Logo from "../Logo";

const Header = (props) => {
  const store_data = useSelector((state) => state);
  const [configuration, setConfiguration] = useState({});

  const [isActive, setActive] = useState(false);

  const handleToggle = () => {
    setActive(!isActive);
  };
  useEffect(() => {
    setConfiguration(store_data.configuration);
  }, [store_data]);
  const { logo } = configuration;
  return (
    <div
      className="header-logo"
      style={{ backgroundColor: configuration?.mainColor }}
    >
      <div className="header-wrapper">
        <Logo src={logo} />

        <div className="menu-icon" onClick={handleToggle}>
          <Image src={MenuIcon} alt="nav button" />
        </div>
        <div
          className={isActive ? "navigation-mobile show" : "navigation-mobile"}
          style={{ backgroundColor: configuration?.mainColor }}
        >
          <Navigation handleToggle={handleToggle} />
        </div>
      </div>
    </div>
  );
};
export default Header;
