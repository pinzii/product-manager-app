// src/app/core/services/notification.service.ts
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

type SnackAction = { label?: string; onClick?: () => void };

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private snack: MatSnackBar) {}

  success(message: string, action?: SnackAction) { this.open(message, 'success-snack', action); }
  info(message: string, action?: SnackAction)    { this.open(message, 'info-snack', action); }
  warn(message: string, action?: SnackAction)    { this.open(message, 'warn-snack', action); }
  error(message: string, action?: SnackAction)   { this.open(message, 'error-snack', action); }

  private open(message: string, panelClass: string, action?: SnackAction) {
    const ref = this.snack.open(message, action?.label ?? 'OK', { panelClass });
    if (action?.onClick) ref.onAction().subscribe(() => action.onClick!());
  }
}
