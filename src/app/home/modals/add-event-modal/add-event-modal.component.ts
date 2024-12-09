import { Component, DestroyRef, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccountingService } from '@home/services/accounting.service';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { EventCategoryModel, EventModel } from '@home/models/event.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

interface EventFormModel{
  type: FormControl<string>;
  amount: FormControl<number>;
  categoryId: FormControl<number>;
  description: FormControl<string>;
}

@Component({
  selector: 'app-add-event-modal',
  templateUrl: './add-event-modal.component.html',
  styleUrl: './add-event-modal.component.scss'
})
export class AddEventModalComponent {
  categories$: Observable<EventCategoryModel[]>;

  eventForm: FormGroup<EventFormModel>;
  userId: string = JSON.parse(localStorage.getItem('user')!).id;

  private dialogRef: MatDialogRef<AddEventModalComponent> = inject(MatDialogRef);
  private accountingService: AccountingService = inject(AccountingService);
  private fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  private destroyRef: DestroyRef = inject(DestroyRef);
  private data: { categories: Observable<EventCategoryModel[]> } = inject(MAT_DIALOG_DATA);

  constructor() {
    this.categories$ = this.data.categories;

    this.eventForm = this.fb.group({
      categoryId: [0, Validators.required],
      type: ['Income', Validators.required],
      amount: [0, [Validators.required, Validators.pattern(/^\d+$/)]],
      description: ['', Validators.required]
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const event: EventModel = {
        ...this.eventForm.getRawValue(),
        id: Date.now(),
        date: new Date().toLocaleString(),
        userId: Number(this.userId),
        amount: Number(this.eventForm.getRawValue().amount),
        categoryId: Number(this.eventForm.getRawValue().categoryId)
      };
      this.accountingService.createEvent(event).pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe();

      this.onClose();
    }
  }
}
