// src/app/products/components/confirm-dialog/confirm-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface ConfirmDialogData {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <h2 mat-dialog-title class="pm-title">
      <div class="pm-title-left">
        <mat-icon class="pm-title-icon">delete_outline</mat-icon>
        <span>{{ data.title || 'Confirmar' }}</span>
      </div>
    </h2>

    <div mat-dialog-content class="pm-message">
      <p [innerHTML]="data.message"></p>
    </div>

    <div mat-dialog-actions align="end" class="pm-actions">
      <button mat-button [mat-dialog-close]="false">
        Cancelar
      </button>
      <button mat-flat-button color="warn" [mat-dialog-close]="true">
        <mat-icon>delete</mat-icon>
        {{ data.confirmText || 'Eliminar' }}
      </button>
    </div>
  `,
  styleUrls: ['confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {}
}
