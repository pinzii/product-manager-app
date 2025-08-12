import { createAction, props } from '@ngrx/store';
import { Product } from '../models/product.model';

// cargar productos
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

// crear un producto
export const createProduct = createAction(
  '[Product] Create Product',
  props<{ product: Product }>()
);

// éxito al crear
export const createProductSuccess = createAction(
  '[Product/API] Create Product Success',
  props<{ product: Product }>()
);

//error al crear
export const createProductFailure = createAction(
  '[Product/API] Create Product Failure',
  props<{ error: any }>()
);

export const deleteProduct = createAction(
  '[Product] Delete Product',
  props<{ id: string | number }>()
);

export const deleteProductSuccess = createAction(
  '[Product/API] Delete Product Success',
  props<{ id: string | number }>()
);

export const deleteProductFailure = createAction(
  '[Product/API] Delete Product Failure',
  props<{ error: any }>()
);


