import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { apis, EDITED_PRODUCT } from "../../constants";
import Button from "../Button";
import DeleteIcon from "../../images/close.svg";
import "../Attributes/attributes.scss";
import Image from "../Image";

const Attributes = ({
  categories,
  businessModels,
  trl,
  updateProduct,
  editable,
}) => {
  const dispatch = useDispatch();
  const [categoryInputShow, setCategoryInputShow] = useState(false);
  const [businessModelInputShow, setBusinessModelInputShow] = useState(false);
  const [trlInputShow, setTrlInputShow] = useState(false);
  const [categoriesArray, setCategoriesArray] = useState(categories);
  const [trlObj, setTrlObj] = useState(trl);
  const [prevTrlObj, setPrevTrlObj] = useState(trl);
  const [trlList, setTrlList] = useState([]);
  const [trlLoading, setTrlLoading] = useState(false);
  const [businessModelsArray, setbusinessModelsArray] =
    useState(businessModels);
  const catagoryInputRef = useRef();
  const business_modelInputRef = useRef();
  useEffect(() => {
    apis
      .getTrl()
      .then((res) => {
        setTrlList(res);
        setTrlLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setCategoriesArray(categories);
    setbusinessModelsArray(businessModels);
  }, [categories, businessModels]);

  const addCategoryHandler = () => {
    let max = 0;
    let updatedCategoriesArray = [
      ...categoriesArray,
      {
        id: categoriesArray?.reduce((prev, cur) => {
          if (prev.id > max) {
            max = prev.id;
          } else if (cur.id > max) {
            max = cur.id;
          } else {
            return max + 1;
          }
          return max + 1;
        }, 0),
        name: catagoryInputRef.current?.value,
      },
    ];
    setCategoriesArray(updatedCategoriesArray);
    dispatch({
      type: EDITED_PRODUCT,
      payload: {
        categories: updatedCategoriesArray,
      },
    });
    updateProduct();
    setCategoryInputShow(!categoryInputShow);
  };
  const addBusinessModelHandler = () => {
    let updatedBusinessModelsArray = [
      ...businessModelsArray,
      {
        id: businessModelsArray[0]?.id ? categoriesArray[0]?.id + 1 : 1,
        name: business_modelInputRef.current?.value,
      },
    ];
    setbusinessModelsArray(updatedBusinessModelsArray);
    dispatch({
      type: EDITED_PRODUCT,
      payload: {
        businessModels: updatedBusinessModelsArray,
      },
    });
    updateProduct();
    setBusinessModelInputShow(!businessModelInputShow);
  };

  const deleteCategoryHandler = (item_id) => {
    setCategoriesArray(categoriesArray.filter(({ id }) => item_id !== id));
    dispatch({
      type: EDITED_PRODUCT,
      payload: {
        categories: categoriesArray.filter(({ id }) => item_id !== id),
      },
    });
  };
  const deleteBusinessModelHandler = (item_id) => {
    setbusinessModelsArray(
      businessModelsArray?.filter(({ id }) => item_id !== id)
    );
    dispatch({
      type: EDITED_PRODUCT,
      payload: {
        businessModels: businessModelsArray.filter(({ id }) => item_id !== id),
      },
    });
  };

  const trlUpdateHandler = (e) => {
    setPrevTrlObj(trlObj);
    setTrlObj(trlList.filter(({ id }) => id === e.target.value)[0]);
  };
  return (
    <div className="attribute-container">
      <div className="attribute-section">
        <h4>Categories :</h4>
        {categoriesArray?.map(({ name, id }, index) => (
          <div className="delete-btn" key={index?.toString()}>
            <div>{name}</div>
            {categoryInputShow && (
              <button
                onClick={() => {
                  deleteCategoryHandler(id);
                }}
              >
                <Image src={DeleteIcon} alt="delete" />
              </button>
            )}
          </div>
        ))}
        {editable && (
          <div className="add-item-btn">
            <Button
              text={categoryInputShow ? "Cancel" : "add item"}
              onClick={() => {
                setCategoryInputShow(!categoryInputShow);
              }}
            />
          </div>
        )}
        {categoryInputShow && (
          <div className="add-new-item">
            <input
              ref={catagoryInputRef}
              type="text"
              value={catagoryInputRef.current?.value}
            />{" "}
            <Button text="add" onClick={addCategoryHandler} />
          </div>
        )}
      </div>
      <div className="attribute-section">
        <h4>Business Model :</h4>
        {businessModelsArray?.map(({ name, id }, index) => (
          <div className="delete-btn" key={index?.toString()}>
            <div>{name}</div>
            {businessModelInputShow && (
              <button
                onClick={() => {
                  deleteBusinessModelHandler(id);
                }}
              >
                <Image src={DeleteIcon} alt="delete" />
              </button>
            )}
          </div>
        ))}
        {editable && (
          <div className="add-item-btn">
            <Button
              text={businessModelInputShow ? "Cancel" : "add item"}
              onClick={() => {
                setBusinessModelInputShow(!businessModelInputShow);
              }}
            />
          </div>
        )}
        {businessModelInputShow && (
          <div className="add-new-item">
            <input
              ref={business_modelInputRef}
              type="text"
              value={business_modelInputRef.current?.value}
            />{" "}
            <Button text="add" onClick={addBusinessModelHandler} />
          </div>
        )}
      </div>
      <div className="attribute-section">
        <h4>TRL :</h4>
        <p>{trlObj.name || ""}</p>
        <div className="edit-btn">
          {editable && (
            <Button
              text="edit"
              onClick={() => {
                setTrlInputShow(!trlInputShow);
              }}
            />
          )}
          {trlInputShow && (
            <Button
              text="save"
              onClick={() => {
                setTrlInputShow(!trlInputShow);
                setPrevTrlObj(trlObj);
                dispatch({ type: EDITED_PRODUCT, payload: { trl: trlObj } });
                updateProduct();
              }}
            />
          )}
          {trlInputShow && (
            <Button
              text="Cancel"
              onClick={() => {
                setTrlInputShow(!trlInputShow);
                setTrlObj(prevTrlObj);
              }}
            />
          )}
        </div>
        <div className="dropdown-btn">
          {trlInputShow && !trlLoading && (
            <select value={trlObj.id} onChange={trlUpdateHandler}>
              {trlList.map(({ id, name }, index) => (
                <option value={id.toString()} key={index.toString()}>
                  {name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    </div>
  );
};
export default Attributes;
