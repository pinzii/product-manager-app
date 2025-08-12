import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from '../state/product.actions';
import { ProductService } from '../products/service/product.service';

import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable()
export class ProductEffects {
  load$;
  createProduct$;
  deleteProduct$;

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {
    this.load$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ProductActions.loadProducts),
        mergeMap(() =>
          this.productService.getAll().pipe(
            map(products => ProductActions.loadSuccess({ products })),
            catchError(error => of(ProductActions.loadFailure({ error })))
          )
        )
      )
    );

    this.createProduct$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ProductActions.createProduct),
        mergeMap(({ product }) =>
          this.productService.create(product).pipe(
            map(created => ProductActions.createProductSuccess({ product: created })),
            catchError(error => of(ProductActions.createProductFailure({ error })))
          )
        )
      )
    );

    this.deleteProduct$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ProductActions.deleteProduct),
        mergeMap(({ id }) =>
          this.productService.delete(id).pipe(
            map(() => ProductActions.deleteProductSuccess({ id })),
            catchError(error => of(ProductActions.deleteProductFailure({ error })))
          )
        )
      )
    );
    

  }
}


