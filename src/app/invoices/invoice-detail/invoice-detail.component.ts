import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Invoice, InvoiceService } from '../invoice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceService
  ) {}
  @Input() invoice!: Invoice;

  displayedColumns: string[] = ['medicineName', 'price', 'quantity', 'subtotal'];

   ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.invoiceService.get(+id).subscribe({
        next: (data) => (this.invoice = data),
        error: (err) => console.error('Failed to load invoice', err),
      });
    }
  }

  printInvoice(): void {
    window.print();
  }
}
