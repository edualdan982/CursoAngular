import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  AuthStatus,
  CheckTokenResponse,
  LoginResponse,
  User,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  //! Al mundo exterior, estos no dejaran que se cambien los valores de las señales
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>(url, body).pipe(
      map(({ user, token }) => this.setAuthentication(user, token)),
      // TODO: errores
      catchError((err) => throwError(() => err.error.message))
    );
  }

  checkAuthStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/check-token`;
    const token = localStorage.getItem('token');

    console.log('cheAuthStatus init');

    if (!token) {
      this.logout();
      return of(false);
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<CheckTokenResponse>(url, { headers }).pipe(
      map(({ token, user }) => this.setAuthentication(user, token)),
      //Error
      catchError(() => {
        this._authStatus.set(AuthStatus.notAuthenticated);
        return of(false);
      })
    );
  }

  private setAuthentication(
    user: User,
    token: string,
    authStatus: AuthStatus = AuthStatus.authenticated
  ): boolean {
    this._currentUser.set(user);
    this._authStatus.set(authStatus);
    localStorage.setItem('token', token);

    return true;
  }

  public logout() {
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
    localStorage.removeItem('token');
  }
}
