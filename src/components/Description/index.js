import { useCallback, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { EDITED_PRODUCT } from "../../constants";
import Button from "../Button";
import "../Description/description.scss";
import EditIcon from "../../images/edit.svg";
import DeleteIcon from "../../images/close.svg";
import Image from "../Image";

const Description = ({ description, logo, updateProduct, editable }) => {
  const [cookies, setCookies] = useCookies();
  const [descriptionText, setDescriptionText] = useState(description);
  const [prevDescriptionText, setPrevDescriptionText] = useState(description);
  const [inputShow, setInputShow] = useState(false);
  const inputRef = useRef();
  const dispatch = useDispatch();

  const setcookieFunction = useCallback(() => {
    setCookies("secrate-cookie-value", logo);
  }, [logo, setCookies]);

  useEffect(() => {
    setcookieFunction(); /* this function will store set cookie named "secrate-cookie-value" with  link company Logo as value  */
  }, [setcookieFunction]);

  useEffect(() => {
    setDescriptionText(description);
    setPrevDescriptionText(description);
  }, [description]);

  const clickHandler = () => {
    setPrevDescriptionText(descriptionText);
    setInputShow(false);
    dispatch({
      type: EDITED_PRODUCT,
      payload: { description: descriptionText },
    });
    updateProduct();
  };

  const createMarkup = (txt) => {
    let secreate_cookie_value = cookies["secrate-cookie-value"];
    return {
      __html: txt?.replace("src=a", "src=" + secreate_cookie_value) || "",
      /*  getting custom value for src tag from cookies and replace it with give <img> tag "src"attribute   */
    };
    // return { __html: txt || "" };   => This gives error in <img> tag given in data because "src=a" passed in tag.
  };

  return (
    <div className="description-container">
      <h4>Description :</h4>
      <div dangerouslySetInnerHTML={createMarkup(descriptionText)}></div>
      <div className="description-btn">
        {inputShow && (
          <textarea
            ref={inputRef}
            type="text"
            value={
              !inputRef.current?.value
                ? descriptionText
                : inputRef.current?.value
            }
            // style={{ color: isEdited?"red":"" }}
            onChange={(e) => {
              setDescriptionText(e.target.value);
            }}
          />
        )}
        <div className="descrition-update-btn">
          {editable && (
            <button
              text={inputShow ? "Cancel" : "Edit"}
              onClick={() => {
                setInputShow(!inputShow);
                if (inputShow) {
                  setDescriptionText(prevDescriptionText);
                }
              }}
            >
              <Image src={inputShow ? DeleteIcon : EditIcon} alt="" />
            </button>
          )}

          <div className="btn-save">
            {inputShow && <Button text="Save" onClick={clickHandler} />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Description;
