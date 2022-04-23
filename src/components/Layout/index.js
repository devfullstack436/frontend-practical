import Header from "../Header";
import Navigation from "../Navigation";
import "../Layout/layout.scss";

const Layout = (props) => {
  return (
    <div>
      <div className="top-nav">
        <Header />
      </div>
      <div className="main-container">
        <Navigation></Navigation>
        {props.children}
      </div>
    </div>
  );
};
export default Layout;
