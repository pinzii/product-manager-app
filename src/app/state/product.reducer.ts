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
    on(ProductActions.loadSuccess, (state, { products }) => ({
        ...state,
        products,       
    })),
    on(ProductActions.loadFailure, (state, { error }) => ({
        ...state,
        error
    }))
);
