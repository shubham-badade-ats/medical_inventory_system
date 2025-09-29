import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Invoice, InvoiceService } from '../invoice.service';
import { MatCardModule } from '@angular/material/card';
import { InvoiceDetailComponent } from '../invoice-detail/invoice-detail.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,MatCardModule,
    ReactiveFormsModule,InvoiceDetailComponent
  ],
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'customer', 'date', 'paymentMode', 'total', 'actions'];
  dataSource: Invoice[] = [];

  customerFilter = new FormControl('');
  dateFilter = new FormControl<Date | null>(null);

  constructor(private invoiceService: InvoiceService, private router:Router) {}

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices(): void {
    this.invoiceService.list().subscribe({
      next: (res) => (this.dataSource = res),
      error: (err) => console.error('Error loading invoices', err)
    });
  }
  onAddInvoice() {
    // Navigate to add invoice form
     this.router.navigate(['/invoices/add']);
    console.log('Navigate to add invoice form');  }

  applyFilters(): void {
    let filtered = [...this.dataSource];

    const customer = this.customerFilter.value?.toLowerCase();
    const date = this.dateFilter.value;

    if (customer) {
      filtered = filtered.filter((inv) =>
        inv.customer.toLowerCase().includes(customer)
      );
    }

    if (date) {
      filtered = filtered.filter(
        (inv) => new Date(inv.date).toDateString() === date.toDateString()
      );
    }

    this.dataSource = filtered;
  }

  clearFilters(): void {
    this.customerFilter.setValue('');
    this.dateFilter.setValue(null);
    this.loadInvoices();
  }

  

  selectedInvoice: Invoice | null = null;

viewInvoice(invoice: Invoice): void {
  this.selectedInvoice = invoice;
}
}
