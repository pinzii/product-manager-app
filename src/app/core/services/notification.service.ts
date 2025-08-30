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

   /** Helpers con botón de Deshacer */
  successWithUndo(message: string, undo: () => void, label = 'Deshacer', duration = 5000) {
    this.success(message, { label, onClick: undo });
  }
  infoWithUndo(message: string, undo: () => void, label = 'Deshacer') {
    this.info(message, { label, onClick: undo });
  }
  warnWithUndo(message: string, undo: () => void, label = 'Deshacer') {
    this.warn(message, { label, onClick: undo });
  }

  private open(message: string, panelClass: string | string[], action?: SnackAction) {
    const classes = Array.isArray(panelClass) ? panelClass : [panelClass];
    const ref = this.snack.open(message, action?.label ?? 'OK', {
      panelClass: ['pm-snack-glass', ...classes]
    });
    if (action?.onClick) ref.onAction().subscribe(() => action.onClick!());
  }
}
