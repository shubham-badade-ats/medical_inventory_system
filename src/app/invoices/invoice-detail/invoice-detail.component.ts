import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
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
export class InvoiceDetailComponent implements OnInit, AfterViewInit {
  
  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceService
  ) {}

  @Input() invoice!: Invoice;

  displayedColumns: string[] = ['medicineName', 'price', 'quantity', 'subtotal'];

  products = [
    {
      sr: 1,
      hsn: 'BIO5004',
      name: 'NS 100ML CP',
      batch: '2203 CNA250',
      expiry: '05/27',
      qty: 1,
      rate: 345.00
    }
  ];

  cgstRate = 6;
  sgstRate = 6;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.invoiceService.get(+id).subscribe({
        next: (data) => {
          this.invoice = data;
          this.generateInvoiceTable(); // ✅ load table after data
        },
        error: (err) => console.error('Failed to load invoice', err),
      });
    } else {
      this.generateInvoiceTable(); // ✅ fallback for demo data
    }
  }

  ngAfterViewInit(): void {
    // Generate table once DOM is ready
    this.generateInvoiceTable();
  }

  /** ✅ Generate dynamic table for invoice print view */
  generateInvoiceTable() {
    const tableBody = document.getElementById('invoiceBody');
    const totalSection = document.getElementById('totalSection');

    if (!tableBody || !totalSection) return;

    tableBody.innerHTML = ''; // clear any old content

    let total = 0;

    this.products.forEach((p, i) => {
      const amount = p.qty * p.rate;
      total += amount;

      const row = `
        <tr>
          <td>${i + 1}</td>
          <td>${p.hsn}</td>
          <td>${p.name}</td>
          <td>${p.batch}</td>
          <td>${p.expiry}</td>
          <td>${p.qty}</td>
          <td>${p.rate.toFixed(2)}</td>
          <td>${amount.toFixed(2)}</td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });

    // Tax calculation
    const cgst = (total * this.cgstRate) / 100;
    const sgst = (total * this.sgstRate) / 100;
    const net = total + cgst + sgst;

    totalSection.innerHTML = `
      <div style="text-align: right; margin-top: 10px; font-family: 'Courier New'; font-size: 14px;">
        <p>Gross Amount: ₹${total.toFixed(2)}</p>
        <p>CGST (${this.cgstRate}%): ₹${cgst.toFixed(2)}</p>
        <p>SGST (${this.sgstRate}%): ₹${sgst.toFixed(2)}</p>
        <h3>Net Amount: ₹${net.toFixed(2)}</h3>
      </div>
    `;
  }


  

  /** ✅ Print function (opens clean print window) */
printInvoice() {
  const cgst = this.invoice.totalAmount * 0.06;
  const sgst = this.invoice.totalAmount * 0.06;
  const net = this.invoice.totalAmount + cgst + sgst;

  const tableRows = (this.invoice.soldProducts || []).map(item => {
    const medName = item.medicine?.name || 'Unknown';
    const batchNumber= item.medicine?.batchNumber || 'Unknown';
    const price = Number(item.price || 0).toFixed(2);
    const qty = item.quantity || 0;
    const subtotal = (item.price || 0) * qty;
    return `
      <tr>
        <td>${medName}</td>
        <td${batchNumber}</td>
        <td>${price}</td>
        <td>${qty}</td>
        <td>${subtotal.toFixed(2)}</td>
      </tr>
    `;
  }).join('');

  const customerName = this.invoice.customer?.name || 'Unknown Customer';

  const popupWin = window.open('', '_blank', 'width=800,height=600');
  popupWin!.document.open();
  popupWin!.document.write(`
    <html>
      <head>
        <title>Invoice #${this.invoice.id}</title>
        <style>
          body { font-family: 'Courier New', monospace; padding: 20px; }
          h2 { text-align: center; margin: 0; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th, td { border: 1px solid #000; padding: 6px; text-align: center; }
          .total { text-align: right; margin-top: 15px; font-size: 16px; font-weight: bold; }
        </style>
      </head>
      <body onload="window.print(); window.close();">
        <h2>GST TAX INVOICE</h2>

        <div>
          <strong>SHIVRAJ MEDICAL</strong><br />
          Near Sanman Hospital, Kirti Society, Satara Road, Nagthane<br />
          GSTIN: 27BFGPY6774R1Z2<br />
          State: Maharashtra (27)
        </div>

        <p><strong>To:</strong><br />
        ${customerName}<br />
        SATARA, MAHARASHTRA</p>

        <p><strong>Date:</strong> ${new Date(this.invoice.date).toLocaleDateString()}<br />
        <strong>Invoice #:</strong> ${this.invoice.id}<br />
        <strong>Payment Mode:</strong> ${this.invoice.paymentMode}</p>

        <table>
          <thead>
            <tr>
              <th>Medicine</th>
              <th>RATE</th>
              <th>batchNumber</th>
              <th>MRP</th>
              <th>Qty</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>

        <div class="total">
          <p>CGST (6%): ₹${cgst.toFixed(2)}</p>
          <p>SGST (6%): ₹${sgst.toFixed(2)}</p>
          <p><strong>Grand Total: ₹${net.toFixed(2)}</strong></p>
        </div>

        <div style="text-align: right; margin-top: 40px;">
          <p>For <strong>SHIVRAJ MEDICAL</strong></p>
          <p><i>Authorised Signatory</i></p>
        </div>
      </body>
    </html>
  `);
  popupWin!.document.close();
}


}
