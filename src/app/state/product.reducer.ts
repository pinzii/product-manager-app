import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.actions';
import { Product } from '../models/product.model';

export interface State {
  products: Product[];
  error: any;
}

export const initialState: State = {
  products: [],
  error: null
};

export const productReducer = createReducer(
  initialState,

  // Load
  on(ProductActions.loadSuccess, (state, { products }) => ({
    ...state,
    products,
    error: null
  })),
  on(ProductActions.loadFailure, (state, { error }) => ({
    ...state,
    error
  })),

  // Create
  on(ProductActions.createProductSuccess, (state, { product }) => ({
    ...state,
    products: [...state.products, product],
    error: null
  })),
  on(ProductActions.createProductFailure, (state, { error }) => ({
    ...state,
    error
  })),

  // Delete
  on(ProductActions.deleteProductSuccess, (state, { id }) => ({
    ...state,
    products: state.products.filter(p =>String(p.id) !== String(id)),
    error: null
  })),
  on(ProductActions.deleteProductFailure, (state, { error }) => ({
    ...state,
    error
  })),

  // Update
  on(ProductActions.updateProductSuccess, (state, { product }) => ({
    ...state,
    products: state.products.map(p => (p.id === product.id ? product : p)),
    error: null
 })),

 on(ProductActions.updateProductFailure, (state, { error }) => ({
   ...state,
   error
 }))
);
