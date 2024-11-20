import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { User } from '@models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = 'http://localhost:3000/users';
  private http: HttpClient = inject(HttpClient);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  signUp(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user).pipe(
      tap((response: User) => {
        this.localStorageService.saveUserData(response);
      }),
      catchError(() => of())
    );
  }

  checkEmailUniqueness(email: string): Observable<boolean> {
    return this.http.get<User[]>(`${this.baseUrl}?email=${email}`).pipe(
      map((users) => users.length === 0),
      catchError(() => of())
    );
  }
}
