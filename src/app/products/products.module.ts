import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ReactiveFormsModule } from '@angular/forms';

// NgRx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { productReducer } from '../state/product.reducer';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductsComponent,
    RouterModule.forChild([
      { path: '', component: ProductsComponent }
    ]),
    
    // ✅ Registrar el feature store y efectos aquí
    StoreModule.forFeature('products', productReducer),
    EffectsModule.forFeature([])
  ]
})
export class ProductsModule {}
