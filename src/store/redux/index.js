import { createStore } from "redux";
import { reducerFunction } from "./reducer";
export const initialState = {
  product: {},
  configuration: {},
  edited_product: {},
};

export const store = createStore(reducerFunction, initialState);
