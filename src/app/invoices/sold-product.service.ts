// src/app/invoices/sold-product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SoldProduct } from './invoice.service';

@Injectable({ providedIn: 'root' })
export class SoldProductService {
  private apiUrl = 'http://localhost:8080/api/sold-products';

  constructor(private http: HttpClient) {}

  list(): Observable<SoldProduct[]> {
    return this.http.get<SoldProduct[]>(this.apiUrl);
  }

  get(id: number): Observable<SoldProduct> {
    return this.http.get<SoldProduct>(`${this.apiUrl}/${id}`);
  }

  create(sp: SoldProduct): Observable<SoldProduct> {
    return this.http.post<SoldProduct>(this.apiUrl, sp);
  }
}
