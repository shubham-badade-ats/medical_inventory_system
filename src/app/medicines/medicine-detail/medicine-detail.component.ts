import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

export interface Medicine {
  id?: number;
  name: string;
  category: string;
  stock: number;
  price: number;
  expiryDate: Date;
}

@Component({
  selector: 'app-medicine-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './medicine-detail.component.html',
  styleUrls: ['./medicine-detail.component.css']
})
export class MedicineDetailComponent {
  @Input() medicine!: Medicine;

  close() {
    // 🔹 If used in dialog, hook MatDialogRef.close() here
    console.log('Close clicked');
  }
}
