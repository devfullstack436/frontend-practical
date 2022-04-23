import { useEffect, useRef, useState } from "react";
import { EDITED_PRODUCT } from "../../constants";
import Button from "../Button";
import "../ProductMainInfo/productinfo.scss";

const ProductMainInfo = ({ title, type, editable }) => {
  const { id, name } = type || {};
  const titleRef = useRef();
  const typeRef = useRef();

  const [mainInfo, setMainInfo] = useState({ title, type_name: name, id });
  const [prevMainInfo, setPrevMainInfo] = useState({
    title,
    type_name: name,
    id,
  });
  const [inputShow, setInputShow] = useState(false);
  useEffect(() => {
    setMainInfo({ title, type_name: name, id });
    setPrevMainInfo({ title, type_name: name, id });
  }, [title, type, name, id]);

  const clickHandler = () => {
    setInputShow(!inputShow);
    setPrevMainInfo(mainInfo);
    setMainInfo({
      title: mainInfo?.title,
      id: mainInfo?.id + 1,
      type_name: mainInfo?.type_name,
    });
    dispatchEvent({
      type: EDITED_PRODUCT,
      payload: {
        name: mainInfo?.title,
        type: { id: mainInfo?.id + 1, name: mainInfo?.type_name },
      },
    });
  };
  return (
    <div className="product-info">
      <h6>Product Main Info : </h6>
      <h4>{mainInfo?.title}</h4>
      {inputShow && (
        <input
          ref={titleRef}
          type="text"
          value={
            titleRef.current?.value ? titleRef.current?.value : mainInfo?.title
          }
          onChange={() => {
            setMainInfo({
              ...mainInfo,
              title: titleRef.current?.value,
            });
          }}
        />
      )}

      <h5>{mainInfo?.type_name || ""}</h5>
      {inputShow && (
        <input
          ref={typeRef}
          type="text"
          value={
            typeRef.current?.value
              ? typeRef.current?.value
              : mainInfo?.type_name
          }
          onChange={() => {
            setMainInfo({
              ...mainInfo,
              type_name: typeRef.current?.value,
            });
          }}
        />
      )}
      {!inputShow && editable && (
        <div className="edit-btn">
          <Button
            text="Edit"
            onClick={() => {
              setInputShow(!inputShow);
            }}
          />
        </div>
      )}
      {inputShow && (
        <div className="edit-btn">
          {" "}
          <Button text="Save" onClick={clickHandler} />{" "}
          <Button
            text="cancel"
            onClick={() => {
              setInputShow(!inputShow);
              setMainInfo(prevMainInfo);
            }}
          />
        </div>
      )}
    </div>
  );
};
export default ProductMainInfo;
