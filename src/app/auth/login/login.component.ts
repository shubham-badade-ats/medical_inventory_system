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
      console.error('Login error:', err);

      let message = 'Something went wrong!';

      // Try to extract meaningful messages from known error formats
      if (err?.error?.message) {
        message = err.error.message;
      } else if (err?.message) {
        message = err.message;
      } else if (typeof err === 'string') {
        message = err;
      }

      alert(message);
    }
  });
}

}
