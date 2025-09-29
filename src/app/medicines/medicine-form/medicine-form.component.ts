import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MedicinesService, Medicine } from '../medicines.service'; // ✅ import service

@Component({
  selector: 'app-medicine-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './medicine-form.component.html',
  styleUrls: ['./medicine-form.component.css']
})
export class MedicineFormComponent {
  @Input() isEdit = false;
  @Input() medicine?: Medicine; // for editing existing medicine

  medicineForm: FormGroup;

  constructor(private fb: FormBuilder, private medicineService: MedicinesService) {
    this.medicineForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      brand: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    if (this.isEdit && this.medicine) {
      this.medicineForm.patchValue(this.medicine);
    }
  }

  onSubmit() {
    if (this.medicineForm.valid) {
      const medicineData: Medicine = this.medicineForm.value;

      if (this.isEdit && this.medicine) {
        this.medicineService.update(this.medicine.id, medicineData).subscribe({
          next: (res) => console.log('Updated successfully', res),
          error: (err) => console.error('Update failed', err)
        });
      } else {
        this.medicineService.create(medicineData).subscribe({
          next: (res) => console.log('Saved successfully', res),
          error: (err) => console.error('Save failed', err)
        });
      }
    }
  }

  onReset() {
    this.medicineForm.reset();
  }
}
