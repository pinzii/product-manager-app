import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from '../state/product.actions';
import { ProductService } from '../products/service/product.service';

import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { NotificationService } from 'app/core/services/notification.service';
import { Store } from '@ngrx/store';

@Injectable()
export class ProductEffects {
  load$;
  createProduct$;
  deleteProduct$;
  updateProduct$;
  createSuccessSnack$;
  
  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private notify: NotificationService,
    private store: Store

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

    this.updateProduct$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ProductActions.updateProduct),
        mergeMap(({ product }) =>
          this.productService.update(product).pipe(
            map(updated => ProductActions.updateProductSuccess({ product: updated })),
            catchError(error => of(ProductActions.updateProductFailure({ error })))
          )
        )
      )
    );    
    
    
    // ✅ Snackbar de éxito al crear (sin despachar nada)
   this.createSuccessSnack$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(ProductActions.createProductSuccess),
          tap(({ product }) => {
            this.notify.successWithUndo(`"${product.name}" creado`, () => {
              if (product?.id == null) return; // por seguridad
              this.store.dispatch(ProductActions.deleteProduct({ id: product.id }));
              this.notify.info('Creación deshecha');
            });
          })
        ),
      { dispatch: false }
    );
  }
  
}


