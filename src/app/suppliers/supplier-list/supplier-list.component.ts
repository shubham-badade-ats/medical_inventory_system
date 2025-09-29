import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SupplierService } from '../supplier.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css'],
  standalone: true,
  imports: [CommonModule, MatIconModule,CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule]
})
export class SupplierListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'contact', 'email', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private supplierService: SupplierService, private router: Router,private supplierservice:SupplierService) {}

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers() {

  
    this.supplierService.getSuppliers().subscribe((data) => {
      console.log('Suppliers fetched:', data);

      console.log('jwttoken'+JSON.stringify(localStorage.getItem('jwtToken')));
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  addSupplier() {
    this.supplierservice.
  }

  onEditSupplier(supplier: any) {
    console.log('Edit supplier:', supplier);
  }

  onDeleteSupplier(supplier: any) {
    console.log('Delete supplier:', supplier);
  }
}
