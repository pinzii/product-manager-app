import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '@models/product.model';

@Component({
  selector: 'app-edit-product-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule
  ],
  template: `
    <h3 style="margin:0 0 12px">Editar producto</h3>

    <form [formGroup]="form" (ngSubmit)="save()">
      <mat-form-field appearance="fill" class="w-full">
        <mat-label>Nombre</mat-label>
        <input matInput formControlName="name" />
        <mat-error *ngIf="form.get('name')?.invalid">Requerido</mat-error>
      </mat-form-field>

      <mat-form-field appearance="fill" class="w-full">
        <mat-label>Precio</mat-label>
        <input matInput type="number" formControlName="price" />
        <mat-error *ngIf="form.get('price')?.invalid">Precio inválido</mat-error>
      </mat-form-field>

      <div style="display:flex; gap:8px; justify-content:flex-end;">
        <button mat-button type="button" (click)="close()">Cancelar</button>
        <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">Guardar</button>
      </div>
    </form>
  `
})
export class EditProductDialogComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ref: MatDialogRef<EditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
    this.form = this.fb.group({
      name: [data?.name ?? '', Validators.required],
      price: [data?.price ?? 0, [Validators.required, Validators.min(0)]],
    });
  }

  close() { this.ref.close(); }

  save() {
    if (this.form.invalid) return;
    const { name, price } = this.form.value as { name: string; price: number };
    this.ref.close({ ...this.data, name, price: Number(price) });
  }
}
