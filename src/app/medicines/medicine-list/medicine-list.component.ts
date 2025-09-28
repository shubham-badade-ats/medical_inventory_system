import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface Medicine {
  id: number;
  name: string;
  category: string;
  stock: number;
  price: number;
}

@Component({
  selector: 'app-medicine-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.css']
})
export class MedicineListComponent {
  displayedColumns: string[] = ['id', 'name', 'category', 'stock', 'price', 'actions'];
  dataSource = new MatTableDataSource<Medicine>([
    { id: 1, name: 'Paracetamol', category: 'Tablet', stock: 120, price: 25 },
    { id: 2, name: 'Amoxicillin', category: 'Capsule', stock: 50, price: 80 },
    { id: 3, name: 'Cough Syrup', category: 'Syrup', stock: 30, price: 120 },
  ]);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  onEdit(id: number) {
    console.log('Edit medicine with id:', id);
  }

  onDelete(id: number) {
    console.log('Delete medicine with id:', id);
  }
}
