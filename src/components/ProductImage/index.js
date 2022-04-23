import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { EDITED_PRODUCT } from "../../constants";
import Button from "../Button";
import Image from "../Image";
import "../ProductImage/productimage.scss";
import EditIcon from "../../images/edit.svg";

const ProductImage = ({ src, updateProduct, editable }) => {
  const [img, setImg] = useState(src);
  const [prev_src, setPrev_src] = useState(src);
  const [inputShow, setInputShow] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setImg(src);
  }, [src]);
  const changeHandler = (e) => {
    setImg(URL.createObjectURL(e.target.files[0]));
    setPrev_src(img);
  };
  const clickHandler = () => {
    dispatch({ type: EDITED_PRODUCT, payload: { picture: img } });
    setPrev_src(img);
    setInputShow(!inputShow);
    updateProduct();
  };
  return (
    <div className="img-container">
      {editable && (
        <button
          className="image-edit"
          onClick={() => {
            setInputShow(!inputShow);
          }}
        >
          <Image src={EditIcon} alt="edit" />
        </button>
      )}
      <Image src={img} alt="Product Main Image" />
      <div className="image-upload">
        {inputShow && (
          <>
            <input type="file" onChange={changeHandler} />
            <div className="upload-btn">
              <Button text="Publish" onClick={clickHandler} />
              <Button
                text="Cancel"
                onClick={() => {
                  setInputShow(!inputShow);
                  setImg(prev_src);
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default ProductImage;
