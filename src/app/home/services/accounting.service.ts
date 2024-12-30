import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { delay, map, Observable, throwError } from 'rxjs';
import { BillingModel, ExchangeRateModel } from '@home/models/billing.model';
import { catchError } from 'rxjs/operators';
import { environment } from '@environments/environment.development';
import { EventCategoryModel, EventModel } from '@home/models/event.model';

@Injectable({
  providedIn: 'root'
})
export class AccountingService {
  private http: HttpClient = inject(HttpClient);
  private API_URL: string = environment.apiUrl;
  private API_KEY: string = environment.apiKey;

  getCurrentUserBill(userId: string): Observable<BillingModel> {
    const params: HttpParams = new HttpParams().set('userId', userId);

    return this.http.get<BillingModel[]>('/bill', { params }).pipe(
      delay(200),
      map(response => response[0]),
      catchError(() => throwError(() => new Error('Failed to fetch billing information.')))
    );
  }

  getExchangeRates(): Observable<ExchangeRateModel> {
    const params: HttpParams = new HttpParams().set('apikey', this.API_KEY);

    return this.http.get<ExchangeRateModel>(this.API_URL, { params }).pipe(
      catchError(() => throwError(() => new Error('Failed to fetch exchange rates.')))
    );
  }

  updateExchangeRates(rates: ExchangeRateModel): Observable<boolean> {
    return this.http.put<boolean>('/currency', rates).pipe(
      catchError(() => throwError(() => new Error('Failed to update exchange rates.')))
    );
  }

  getBackupExchangeRates(): Observable<ExchangeRateModel> {
    return this.http.get<ExchangeRateModel>('/currency').pipe(
      catchError(() => throwError(() => new Error('Failed to fetch backup exchange rates.')))
    );
  }

  getCurrentUserEvents(userId: string): Observable<EventModel[]> {
    const params: HttpParams = new HttpParams().set('userId', userId);

    return this.http.get<EventModel[]>('/events', { params }).pipe(
      delay(400),
      catchError(() => throwError(() => new Error('Failed to fetch history information.')))
    );
  }

  createEvent(event: EventModel): Observable<boolean> {
    return this.http.post<boolean>('/events', event).pipe(
      catchError(() => throwError(() => new Error('Failed to create new event.')))
    );
  }

  getCurrentUserCategories(userId: string): Observable<EventCategoryModel[]> {
    const params: HttpParams = new HttpParams().set('userId', userId);

    return this.http.get<EventCategoryModel[]>('/categories', { params }).pipe(
      delay(400),
      catchError(() => throwError(() => new Error('Failed to fetch categories information.')))
    );
  }

  editCategory(category: EventCategoryModel): Observable<boolean> {
    return this.http.put<boolean>(`/categories/${category.id}`, category).pipe(
      catchError(() => throwError(() => new Error('Failed to edit category.')))
    );
  }

  createCategory(category: EventCategoryModel): Observable<boolean> {
    return this.http.post<boolean>('/categories', category).pipe(
      catchError(() => throwError(() => new Error('Failed to create new category.')))
    );
  }

  getCategoryById(categoryId: string): Observable<EventCategoryModel> {
    const params: HttpParams = new HttpParams().set('id', categoryId);

    return this.http.get<EventCategoryModel[]>('/categories', { params }).pipe(
      delay(400),
      map(response => response[0]),
      catchError(() => throwError(() => new Error('Failed to fetch category information.')))
    );
  }

  deleteCategory(categoryId: string): Observable<boolean> {
    return this.http.delete<boolean>(`/categories/${categoryId}`).pipe(
      catchError(() => throwError(() => new Error('Failed to delete category.')))
    );
  }

  getEventById(eventId: string): Observable<EventModel> {
    const params: HttpParams = new HttpParams().set('id', eventId);

    return this.http.get<EventModel[]>('/events', { params }).pipe(
      delay(400),
      map(response => response[0]),
      catchError(() => throwError(() => new Error('Failed to fetch event information.')))
    );
  }
}
