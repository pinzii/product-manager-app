import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';

@NgModule({
  imports: [
    CommonModule,
    // Ruta interna: '' equivale a '/products'
    ProductsComponent,
    RouterModule.forChild([
      { path: '', component: ProductsComponent }
    ])
  ]
})
export class ProductsModule {}
