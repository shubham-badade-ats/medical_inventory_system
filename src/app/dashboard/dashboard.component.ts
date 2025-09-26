import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Needed for routerLink

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  stats = [
    { title: 'Total Items', count: 175, icon: '🧪', link: '/inventory/list' },
    { title: 'Add New Item', count: '-', icon: '➕', link: '/inventory/add' },
    { title: 'Low Stock Items', count: 12, icon: '⚠️', link: '/inventory/list' }
  ];
}

