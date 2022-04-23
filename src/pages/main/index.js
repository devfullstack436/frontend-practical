import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import { apis, CONFIGURATION } from "../../constants";
import "../main/main.scss";

const Main = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const getConfiguration = useCallback(async () => {
    let APP_ID = process.env.REACT_APP_APP_ID || "1";
    apis
      .getConfiguration(APP_ID)
      .then((res) => {
        dispatch({ type: CONFIGURATION, payload: res });
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [dispatch]);
  useEffect(() => {
    getConfiguration();
  }, [getConfiguration]);
  if (loading) {
    return (
      <div className="product-container">
        <Loader />
      </div>
    );
  }
  return (
    <div className="product-container">
      <div className="main-page-content">
        <h4>Main Page</h4>
      </div>
    </div>
  );
};
export default Main;
