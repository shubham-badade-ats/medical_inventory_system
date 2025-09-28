import { Routes } from '@angular/router';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';

export const invoicesRoutes: Routes = [
  { path: '', component: InvoiceListComponent },
  { path: 'add', component: InvoiceFormComponent },
  { path: 'edit/:id', component: InvoiceFormComponent },
  { path: ':id', component: InvoiceDetailComponent }
];
