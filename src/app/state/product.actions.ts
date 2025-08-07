import { createAction, props } from '@ngrx/store';
import { Product } from '../models/product.model';

export const loadProducts = createAction(
  '[Product] Load Products'
);

export const loadSuccess = createAction(
  '[Product/API] Load Success',
  props<{ products: Product[] }>()  
);

export const loadFailure = createAction(
  '[Product/API] Load Failure',
  props<{ error: any }>()
);
