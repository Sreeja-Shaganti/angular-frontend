import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserLoginDTO, UserRegistrationDTO } from '../shared/models/user.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/auth';

  constructor(private http: HttpClient, private router: Router) { }

  register(dto: UserRegistrationDTO) {
    return this.http.post(`${this.apiUrl}/register`, dto);
  }

  login(dto: UserLoginDTO) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, dto)
      .pipe(tap(response => {
        localStorage.setItem('token', response.token);
        // Handle user state
      }));
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
