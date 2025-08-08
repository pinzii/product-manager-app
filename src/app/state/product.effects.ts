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
  
  constructor(
    private actions$: Actions,
    private productService: ProductService

  ) {
    this.load$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ProductActions.loadProducts),
        mergeMap(() =>
         this.productService.getAll().pipe(

          map((products: Product[]) =>
             ProductActions.loadSuccess({ products })
           ),
            catchError(error => of(ProductActions.loadFailure({ error })))
          )
        )
      )
    );
  }
}
