import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '@models/product.model';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { NotificationService } from 'app/core/services/notification.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnChanges{
  @Input() product: Product | null = null;
  @Output() submitProduct = new EventEmitter<Product>();
  @Output() submitUpdate  = new EventEmitter<Product>();

  productForm: FormGroup;

  constructor(private fb: FormBuilder, private notify: NotificationService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product']) {
      const p = changes['product'].currentValue as Product | null;
      if (p) {
        this.productForm.patchValue({
          name: p.name ?? '',
          price: p.price ?? 0
        });
      } else {
        this.productForm.reset();
      }
    }
  }

  get isEdit(): boolean {
    return !!this.product;
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      this.notify.warn('Completa los campos requeridos');
      return;
    }

    const value = this.productForm.value as Product;

    if (this.isEdit) {
      this.submitUpdate.emit({ ...this.product!, ...value });
    } else {
      this.submitProduct.emit(value);
    }

    this.productForm.reset();
  }
}
