import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { Store, select }     from '@ngrx/store';
import { Observable }        from 'rxjs';
import * as ProductActions   from '../state/product.actions';
import { Product }           from '../models/product.model';
import { ProductFormComponent } from './components/product-form/product-form.component';

import { AuthService } from 'app/auth/pages/auth.service';
import { Router } from '@angular/router';

// Material
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { EditProductDialogComponent } from './components/product-form/edit-product-dialog/edit-product-dialog-component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    ProductFormComponent,

    // Material
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatTooltipModule
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  // Observable ligado al state
  products$: Observable<Product[]>;
  displayedColumns = ['id', 'name', 'price', 'actions'];

  constructor(
    // Inyectamos el Store de NgRx
    private store: Store<{ products: { products: Product[]; error: any } }>,
    private auth: AuthService,
    private router: Router,
    private dialog: MatDialog 
  ) {
    // Seleccionamos la lista de products del store
    this.products$ = this.store.select(s => s.products.products);
  }

  ngOnInit(): void {

    this.store.subscribe(state => console.log('STATE ROOT:', state));
    // Despachamos la acción para que el Effect cargue los productos
    this.store.dispatch(ProductActions.loadProducts());
  }

  handleCreate(product: Product): void {
    this.store.dispatch(ProductActions.createProduct({ product }));
  }

  openEdit(product: Product): void {
    const ref = this.dialog.open(EditProductDialogComponent, { data: product });
    ref.afterClosed().subscribe((updated: Product | undefined) => {
      if (updated) {
        this.store.dispatch(ProductActions.updateProduct({ product: updated }));
      }
    });
  }

  handleDelete(id: string | number): void {
    const ok = confirm('¿Eliminar este producto?');
    if (ok) this.store.dispatch(ProductActions.deleteProduct({ id }));
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }

  trackById = (_: number, p: Product) => String(p.id);

}
