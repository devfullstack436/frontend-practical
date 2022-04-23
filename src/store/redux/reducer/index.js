import { CONFIGURATION, EDITED_PRODUCT, PRODUCT } from "../../../constants";

export const reducerFunction = (state, action) => {
  switch (action.type) {
    case PRODUCT:
      return { ...state, product: action.payload };
    case EDITED_PRODUCT:
      const product =
        Object.keys(state.edited_product).length === 0
          ? state.product
          : state.edited_product;
      return {
        ...state,
        edited_product: { ...product, ...action.payload },
      };
    case CONFIGURATION:
      return { ...state, configuration: action.payload };
    default:
      return { ...state };
  }
};
