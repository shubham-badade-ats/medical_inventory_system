import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {

    
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Full login response:', response);

        // Adjust key based on backend field
        const token = response?.jwtToken || response?.token || response?.jwt;
        if (token) {
          localStorage.setItem('jwtToken', token);
          console.log('Token stored successfully.');
          this.router.navigate(['/dashboard']);
        } else {
          console.error('No token found in response.');
          alert('Login failed: No token received from server.');
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        if (err.status === 401 || err.status === 400) {
          alert('Invalid credentials!');
        } else if (err.status === 404) {
          alert('User not found!');
        } else {
          alert('Something went wrong!');
        }
      }
    });
  }
}
