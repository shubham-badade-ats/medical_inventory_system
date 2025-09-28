import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Invoice, InvoiceService, SoldProduct } from '../invoice.service';
import { InvoiceDetailComponent } from '../invoice-detail/invoice-detail.component';

interface Medicine {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatAutocompleteModule,InvoiceDetailComponent
  ],
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent implements OnInit {
  invoiceForm!: FormGroup;

  // mock medicines for now — later fetch from backend
  medicines: Medicine[] = [
    { id: 1, name: 'Paracetamol', price: 10 },
    { id: 2, name: 'Amoxicillin', price: 20 },
    { id: 3, name: 'Ibuprofen', price: 15 }
  ];

  constructor(private fb: FormBuilder, private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.invoiceForm = this.fb.group({
      customer: ['', Validators.required],
      date: [new Date(), Validators.required],
      paymentMode: ['', Validators.required],
      items: this.fb.array([])   // 👈 holds sold products
    });

    this.addItem(); // 👈 start with one row
  }

  // Accessor for items FormArray
  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  // Add new item row
  addItem(): void {
    const item = this.fb.group({
      medicine: ['', Validators.required],
      price: [{ value: 0, disabled: true }],
      quantity: [1, [Validators.required, Validators.min(1)]],
      subtotal: [{ value: 0, disabled: true }]
    });
    this.items.push(item);
  }

  // Remove item row
  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  // Calculate invoice total
  getTotal(): number {
    return this.items.controls.reduce((acc, ctrl) => {
      const val = ctrl.getRawValue();
      return acc + (val.price * val.quantity || 0);
    }, 0);
  }

  private getMedicineId(name: string): number {
    const med = this.medicines.find(m => m.name === name);
    return med ? med.id : 0;
  }
  updateMedicine(item: any, medicineName: string) {
  const med = this.medicines.find(m => m.name === medicineName);
  if (med) {
    item.get('price').setValue(med.price);
    const qty = item.get('quantity').value || 1;
    item.get('subtotal').setValue(med.price * qty);
  }
}

updateQuantity(item: any) {
  const qty = item.get('quantity').value || 0;
  const price = item.get('price').value || 0;
  item.get('subtotal').setValue(price * qty);
}




  onSubmit(): void {
    if (this.invoiceForm.valid) {
      const raw = this.invoiceForm.getRawValue();

      const items: SoldProduct[] = raw.items.map((item: any) => ({
        medicineId: this.getMedicineId(item.medicine),
        medicineName: item.medicine,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity
      }));

      const invoice: Invoice = {
        customer: raw.customer,
        date: new Date(raw.date).toISOString(),
        paymentMode: raw.paymentMode,
        total: this.getTotal(),
        items
      };

      this.invoiceService.create(invoice).subscribe({
        next: (res) => {
          alert('Invoice created successfully ✅');
          console.log(res);
          this.invoiceForm.reset({ date: new Date(), items: [] });
          this.addItem();
        },
        error: (err) => {
          console.error('Error saving invoice:', err);
          alert('Failed to save invoice ❌');
        }
      });
    }
  }
}
