import { Product } from "./products.model";
import {
  createAction,
  createFeatureSelector,
  createSelector,
  props,
} from '@ngrx/store';

// Feature Selector
export const selectProducts =
  createFeatureSelector<Product[]>('products');

export const changeProducts = createAction(
  '[Products] Change Products',
  props<{ products: Product[] }>()
)
