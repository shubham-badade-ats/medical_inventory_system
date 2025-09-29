import { Component, OnInit } from '@angular/core';
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
import { MedicinesService, Medicine } from '../medicines.service';
import { Router } from '@angular/router';

// export interface Medicine {
//   id: number;
//   name: string;
//   category: string;
//   stock: number;
//   price: number;
// }

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
export class MedicineListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'brand', 'quantity', 'price', 'actions'];

  dataSource = new MatTableDataSource<Medicine>();

  constructor(private medicineService: MedicinesService, private router:Router) {}

  ngOnInit(): void {
    this.loadMedicines();
  }

  loadMedicines() {
    this.medicineService.getAll().subscribe({
      next: (data) => this.dataSource.data = data,
      error: (err) => console.error('Error fetching medicines:', err)
    });
  }

  onAddMedicine() {
    // Navigate to add medicine form
    console.log('Navigate to add medicine form');
    
    this.router.navigate(['/medicines/add']);
    

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  onEdit(id: number) {
    console.log('Edit medicine with id:', id);
    this.router.navigate(['/medicines/add']);
    // TODO: open dialog / navigate to edit form
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this medicine?')) {
      this.medicineService.delete(id).subscribe({
        next: () => this.loadMedicines(),
        error: (err) => console.error('Error deleting medicine:', err)
      });
    }
  }
}
