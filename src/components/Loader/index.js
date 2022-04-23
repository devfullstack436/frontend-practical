import Loadericon from "../../images/loader-2.gif";
import Image from "../Image";
import "../Loader/loader.scss";

const Loader = () => {
  return (
    <div className="loaderforcontainer">
      <Image src={Loadericon} alt="loading..." />
    </div>
  );
};
export default Loader;
