import { Component, inject, OnInit } from '@angular/core';
import { BillingService } from '@home/billing/services/billing.service';
import { catchError, combineLatest, map, Observable, of, tap } from 'rxjs';
import { BillingModel, ExchangeRateModel } from '@home/billing/models/billing.model';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.scss'
})
export class BillingComponent implements OnInit {
  private billingService: BillingService = inject(BillingService);

  userId: string = JSON.parse(localStorage.getItem('user')!).id;
  isLoading: boolean = false;
  serverErrorMessage: string = '';

  refreshData(): void {
    location.reload()
  }

  userBill$: Observable<BillingModel> = of();
  convertedBalances$: Observable<BillingModel[]> = of();
  exchangeRates$: Observable<ExchangeRateModel> = of();

  ngOnInit() {
    this.isLoading = true;
    this.userBill$ = this.billingService.getCurrentUserBill(this.userId);

    this.exchangeRates$ = this.billingService.getExchangeRates().pipe(
      map((rate: ExchangeRateModel) => {
        return {...rate, rates: {
            USD: rate.rates['USD'],
            UAH: rate.rates['UAH'],
            EUR: rate.rates['EUR']
          }
        }
      }),
      catchError((err) => {
        this.isLoading = false;
        this.serverErrorMessage = err;
        return of();
      })
    );

    this.convertedBalances$ = combineLatest([this.exchangeRates$, this.userBill$]).pipe(
      map(([rates, bill]: [ExchangeRateModel, BillingModel]) => {
        return [
          {
            userId: bill.userId,
            currency: '€',
            value: bill.value
          },
          {
            userId: bill.userId,
            currency: '$',
            value: bill.value * rates.rates['USD']
          },
          {
            userId: bill.userId,
            currency: '₴',
            value: bill.value * rates.rates['UAH']
          }
        ];
      }),
      tap(() => {
        this.isLoading = false;
      }),
      catchError((err) => {
        this.isLoading = false;
        this.serverErrorMessage = err;
        return of([]);
      })
    );
  }
}
