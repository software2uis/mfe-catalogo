import {
  createAction,
  createFeatureSelector,
  createSelector,
  props,
} from '@ngrx/store';
import { Product } from '../models/product.interface';

// Feature Selector
export const selectProducts =
  createFeatureSelector<Product[]>('products');

export const changeProducts = createAction(
  '[Products] Change Products',
  props<{ products: Product[] }>()
)
