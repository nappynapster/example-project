import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { API_HOST, JWT_TOKEN } from '../config/constants';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient,
              private authGuard: AuthGuard,
              private router: Router) {
  }

  login(email: string, password: string): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(API_HOST + '/auth/login', {
      email, password,
    }).pipe(
      tap((data) => {
        localStorage.setItem(JWT_TOKEN, data.access_token);
      }),
      catchError((err, caught) => {
        localStorage.removeItem(JWT_TOKEN);
        return of({ access_token: '' });
      }),
    );
  }

  logout() {
    this.authGuard.isLoggedIn$.next(false);
    localStorage.removeItem(JWT_TOKEN);
    this.router.navigate(['/login']);
  }
}
