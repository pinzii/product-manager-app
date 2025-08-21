import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { Store, select }     from '@ngrx/store';
import { Observable }        from 'rxjs';
import * as ProductActions   from '../state/product.actions';
import { Product }           from '../models/product.model';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ProductService } from './service/product.service';

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
import { NotificationService } from 'app/core/services/notification.service';

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
  private lastDeleted?: Product;

  constructor(
    // Inyectamos el Store de NgRx
    private store: Store<{ products: { products: Product[]; error: any } }>,
    private auth: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private notify: NotificationService,
    private productsSvc: ProductService
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
    const ref = this.dialog.open(EditProductDialogComponent, { 
      data: product,
      width: '640px',
      maxWidth: '95vw',
      autoFocus: true,
      restoreFocus: true,
      enterAnimationDuration: '150ms',
      exitAnimationDuration: '120ms',
      panelClass: ['pm-dialog-glass', 'pm-dialog-rounded']

    });
    ref.afterClosed().subscribe((updated: Product | undefined) => {
      if (updated) {
        this.store.dispatch(ProductActions.updateProduct({ product: updated }));

        this.notify.success(`"${updated.name}" actualizado`, {
        label: 'Deshacer',
        onClick: () => this.store.dispatch(ProductActions.updateProduct({ product }))
        });
      }
    });
  }

  handleDelete(product: Product): void {
  const ref = this.dialog.open(ConfirmDialogComponent, {
    data: {
      title: 'Eliminar producto',
      // Puedes resaltar el nombre con <strong>
      message: `¿Seguro desea eliminar <strong>"${product.name}"</strong>? `,
      confirmText: 'Eliminar',
      cancelText: 'Cancelar'
    },
    width: '480px',
    maxWidth: '95vw',
    autoFocus: false,
    restoreFocus: true,
    enterAnimationDuration: '140ms',
    exitAnimationDuration: '120ms',
    panelClass: ['pm-dialog-glass', 'pm-dialog-rounded']   // 👈 igual que el de editar
  });

  ref.afterClosed().subscribe((ok: boolean) => {
    if (ok !== true) return;

    // guarda para "Deshacer"
    this.lastDeleted = { ...product };

    this.store.dispatch(ProductActions.deleteProduct({ id: product.id! }));

    // snackbar con "Deshacer"
    this.notify.warn('Producto eliminado', {
      label: 'Deshacer',
      onClick: () => this.undoDelete()
    });
  });
}

  private undoDelete(): void {
    if (!this.lastDeleted) return;
    const { id, ...rest } = this.lastDeleted as any;
   
    this.productsSvc.create(rest as Product).subscribe({
      next: () => {
        this.notify.success('Producto restaurado');
        this.store.dispatch(ProductActions.loadProducts()); // refresca lista
        this.lastDeleted = undefined;
      }
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }

  trackById = (_: number, p: Product) => String(p.id);

}
