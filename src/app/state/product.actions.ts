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

// Acción para crear un producto
export const createProduct = createAction(
  '[Product] Create Product',
  props<{ product: Product }>()
);

// Acción para éxito al crear
export const createProductSuccess = createAction(
  '[Product/API] Create Product Success',
  props<{ product: Product }>()
);

// Acción para error al crear
export const createProductFailure = createAction(
  '[Product/API] Create Product Failure',
  props<{ error: any }>()
);

