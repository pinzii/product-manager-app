import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from '../state/product.actions';
import { DataService } from '../data.service';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable()
export class ProductEffects {
  load$;
  
  constructor(
    private actions$: Actions,
    private dataService: DataService
  ) {
    this.load$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ProductActions.loadProducts),
        mergeMap(() =>
         this.dataService.getProducts().pipe(
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
