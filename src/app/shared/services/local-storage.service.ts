import { Injectable } from '@angular/core';
import { User } from '@models/user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  saveUserData(data: User): void {
    localStorage.setItem('user', JSON.stringify(data));
  }
}
