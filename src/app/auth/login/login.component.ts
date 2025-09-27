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
    HttpClientModule, // <-- must be imported here
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
        console.log('Login successful', response);
        localStorage.setItem('jwtToken', response.jwtToken);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
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
