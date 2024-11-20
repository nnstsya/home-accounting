import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, tap, throwError } from 'rxjs';
import { UserSignUpModel } from '@auth/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = 'http://localhost:3000/users';
  private http: HttpClient = inject(HttpClient);

  signUp(user: UserSignUpModel): Observable<UserSignUpModel> {
    return this.http.post<UserSignUpModel>(this.baseUrl, user).pipe(
      delay(400),
      tap((response: UserSignUpModel) => {
        this.saveUserData(response);
      }),
      catchError(() => {
        return throwError(() => new Error('A server error occurred during registration.'));
      })
    );
  }

  checkEmailUniqueness(email: string): Observable<boolean> {
    return this.http.get<UserSignUpModel[]>(`${this.baseUrl}?email=${email}`).pipe(
      delay(400),
      map((users) => users.length === 0),
      catchError(() => {
        return throwError(() => new Error('Unable to verify email uniqueness due to a server error.'));
      })
    );
  }

  private saveUserData(data: UserSignUpModel): void {
    localStorage.setItem('user', JSON.stringify(data));
  }
}
