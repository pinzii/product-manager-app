import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Product } from '@models/product.model';

@Component({
  selector: 'app-edit-product-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.scss']
})
export class EditProductDialogComponent {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private dialogRef: MatDialogRef<EditProductDialogComponent>,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name:  [data?.name ?? '', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      price: [data?.price ?? 0,  [Validators.required, Validators.min(0)]]
    });
  }

  close(): void { this.dialogRef.close(); }

  save(): void {
    if (this.form.invalid || this.form.pristine) {
      this.form.markAllAsTouched();
      return;
    }
    const updated: Product = { ...this.data, ...this.form.value };
    this.dialogRef.close(updated);
  }
}
