import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Attributes from "../../components/Attributes";
import Button from "../../components/Button";
import Description from "../../components/Description";
import Loader from "../../components/Loader";
import Map from "../../components/Map";
import ProductImage from "../../components/ProductImage";
import ProductMainInfo from "../../components/ProductMainInfo";
import UserInfo from "../../components/UserInfo";
import { CONFIGURATION, PRODUCT } from "../../constants";
import { apis } from "../../constants/apis";
import "../product/product.scss";

const Product = () => {
  const [descriptionTab, setDescriptionTab] = useState(true);
  const [attributesTab, setAttributesTab] = useState(false);
  const [product, setProduct] = useState({});
  const [configuration, setConfiguration] = useState({});
  const dispatch = useDispatch();
  const store_data = useSelector((state) => state);
  const {
    picture,
    businessModels,
    name,
    type,
    description,
    categories,
    trl,
    user,
    company,
  } = product || {};
  const [productLoading, setProductLoading] = useState(true);
  const [configLoading, setConfigLoading] = useState(true);
  const getProducts = useCallback(async () => {
    apis
      .getProducts("/product/6781/")
      .then((res) => {
        dispatch({ type: PRODUCT, payload: res });
        setProductLoading(false);
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  const getConfiguration = useCallback(async () => {
    let APP_ID = process.env.REACT_APP_APP_ID || "1";
    apis
      .getConfiguration(APP_ID)
      .then((res) => {
        dispatch({ type: CONFIGURATION, payload: res });
        setConfigLoading(false);
      })
      .catch((err) => console.log(err));
  }, [dispatch]);
  useEffect(() => {
    getProducts();
    getConfiguration();
  }, [getProducts, getConfiguration]);
  useEffect(() => {
    setProduct(
      store_data.edited_product === {} &&
        store_data.configuration.hasUserSection
        ? store_data.edited_product
        : store_data.product
    );
    setConfiguration(store_data.configuration);
  }, [store_data]);

  const handleClick1 = () => {
    setDescriptionTab(true);
    setAttributesTab(false);
  };
  const handleClick2 = () => {
    setDescriptionTab(false);
    setAttributesTab(true);
  };

  const updateProduct = async () => {
    apis
      .updateProduct("/product/6781/", { ...store_data.edited_product })
      .then((res) => console.log("Updated!"))
      .catch((err) => console.log(err));
  };
  if (productLoading || configLoading) {
    return (
      <div className="product-container">
        <Loader />
      </div>
    );
  }
  return (
    <div className="product-container">
      <div className="product-container-left">
        <div className="product-top-container">
          <div className="product-img-container">
            <ProductImage
              src={picture}
              updateProduct={updateProduct}
              editable={configuration?.hasUserSection}
            />
          </div>
          <div className="product-info-container">
            <ProductMainInfo
              title={name}
              type={type}
              updateProduct={updateProduct}
              editable={configuration?.hasUserSection}
            />
          </div>
        </div>
        <div className="product-description-container">
          <div className="btn-cover">
            <Button
              id="descriptionTab"
              text="Description"
              onClick={handleClick1}
            />
            <Button
              id="attributesTab"
              text="Attributes"
              onClick={handleClick2}
            />
          </div>
          <div className="tab-details">
            {descriptionTab && (
              <Description
                description={description}
                {...company}
                updateProduct={updateProduct}
                editable={configuration?.hasUserSection}
              />
            )}
            {attributesTab && (
              <Attributes
                categories={categories}
                businessModels={businessModels}
                trl={trl}
                updateProduct={updateProduct}
                editable={configuration?.hasUserSection}
              />
            )}
          </div>
        </div>
      </div>

      <div className="product-container-right">
        {configuration?.hasUserSection && (
          <div className="user-details">
            <UserInfo {...user} {...company} />
          </div>
        )}
        <div className="map-details">
          <Map {...company} />
        </div>
      </div>
    </div>
  );
};
export default Product;
