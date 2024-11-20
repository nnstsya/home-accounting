import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private _isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this._isLoading.asObservable();

  setLoading(state: boolean): void {
    this._isLoading.next(state);
  }
}
