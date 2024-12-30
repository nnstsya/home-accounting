import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { EventCategoryModel } from '@home/models/event.model';
import { Observable } from 'rxjs';
import { EventFormModel } from '@home/models/form.model';

@Component({
  selector: 'app-add-event-modal',
  templateUrl: './add-event-modal.component.html',
  styleUrl: './add-event-modal.component.scss'
})
export class AddEventModalComponent {
  categories$: Observable<EventCategoryModel[]>;

  eventForm: FormGroup<EventFormModel>;

  private dialogRef: MatDialogRef<AddEventModalComponent> = inject(MatDialogRef);
  private fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);

  private data: { categories: Observable<EventCategoryModel[]> } = inject(MAT_DIALOG_DATA);

  constructor() {
    this.categories$ = this.data.categories;

    this.eventForm = this.fb.group({
      categoryId: ['', Validators.required],
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
      this.dialogRef.close(this.eventForm);
    }
  }
}
