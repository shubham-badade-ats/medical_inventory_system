import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface SoldProduct {
  medicineId: number;
  medicineName: string;
  price: number;
  quantity: number;
  subtotal: number;
}


export interface Medicine {
  id: number;
  name: string;
  batchNumber: string;
}

export interface SoldProduct {
  id: number;
  quantity: number;
  price: number;
  medicine: Medicine;
}

export interface Customer {
  id: number;
  name: string;
}

export interface Invoice {
  id: number;
    date: string; // ISO format
  paymentMode: string;
  total: number;
  items: SoldProduct[];
  

  
  totalAmount: number;
  customer: Customer;
  soldProducts: SoldProduct[];
}


@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiUrl = environment.apiBaseUrl + '/invoices';

  constructor(private http: HttpClient) {}

  list(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.apiUrl);
  }

  get(id: number): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.apiUrl}/${id}`);
  }

  create(invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(this.apiUrl, invoice);
  }
}
