import { createReducer, on } from "@ngrx/store";
import { initialState } from "./products.model";
import { changeProducts } from "./products.actions";

export const productsReducer = createReducer(
  initialState,
  on(changeProducts, (state, { products }) => {
    return products ?? state;
  })
)
