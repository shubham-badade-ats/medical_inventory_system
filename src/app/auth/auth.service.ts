import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn = false;
  private baseUrl = environment.apiBaseUrl;

  constructor(private router: Router,private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('userName', username)
      .set('userPassword', password);

    return this.http.post<any>(`${this.baseUrl}/login/authenticate`, null, { params }).pipe(
      tap(response => {
        if (response && response.jwtToken) {
          localStorage.setItem('jwtToken', response.jwtToken);
        }
      })
    );
  }
  logout(): void {
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}