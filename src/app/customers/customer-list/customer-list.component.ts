// src/app/customers/customer-list/customer-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import {  CustomerService } from '../customer.service';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTableModule],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  displayedColumns = ['id', 'name', 'email', 'phone', 'actions'];

  constructor(private service: CustomerService, private router: Router) {}

  ngOnInit(): void {
    this.service.list().subscribe(data => (this.customers = data));
  }

  view(id: number) {
    this.router.navigate(['/customers', id]);
  }

  edit(id: number) {
    this.router.navigate(['/customers/edit', id]);
  }

  add() {
    this.router.navigate(['/customers/add']);
  }

  delete(id: number) {
    if (confirm('Delete this customer?')) {
      this.service.delete(id).subscribe(() => {
        this.customers = this.customers.filter(c => c.id !== id);
      });
    }
  }
}
