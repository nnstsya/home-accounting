import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, tap, throwError } from 'rxjs';
import { UserFullInfo, UserModel } from '@auth/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = 'http://localhost:3000/users';
  private readonly http: HttpClient = inject(HttpClient);

  signUp(user: UserFullInfo): Observable<UserFullInfo> {
    return this.http.post<UserFullInfo>(this.baseUrl, user).pipe(
      delay(400),
      tap((response: UserFullInfo) => this.storeUserData(response)),
      catchError(() => throwError(() => new Error('Registration failed due to a server error.')))
    );
  }

  signIn(email: string): Observable<UserFullInfo[]> {
    return this.http.get<UserFullInfo[]>(`${this.baseUrl}?email=${email}`).pipe(
      delay(400),
      tap((response: UserFullInfo[]) => this.storeUserData(response[0])),
      catchError(() => throwError(() => new Error('Login failed due to a server error.')))
    );
  }

  isEmailRegistered(email: string): Observable<boolean> {
    return this.http.get<UserFullInfo[]>(`${this.baseUrl}?email=${email}`).pipe(
      delay(400),
      map((users) => users.length > 0),
      catchError(() => throwError(() => new Error('Unable to check email due to a server error.')))
    );
  }

  validatePassword(email: string, password: string): Observable<boolean> {
    return this.http.get<UserFullInfo[]>(`${this.baseUrl}?email=${email}`).pipe(
      delay(400),
      map((user) => user[0].password === password),
      catchError(() => throwError(() => new Error('Password verification failed due to a server error.')))
    );
  }

  private storeUserData(user: UserFullInfo): void {
    const userData: UserModel = {
      id: user.id,
      email: user.email,
      name: user.name
    }

    localStorage.setItem('user', JSON.stringify(userData));
  }
}
