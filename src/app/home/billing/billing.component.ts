import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { catchError, combineLatest, map, Observable, of } from 'rxjs';
import { BillingModel, ExchangeRateModel } from '@home/models/billing.model';
import { AccountingService } from '@home/services/accounting.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.scss'
})
export class BillingComponent implements OnInit {
  userId: string = JSON.parse(localStorage.getItem('user')!).id;

  userBill$: Observable<BillingModel> = of();
  convertedBalance$: Observable<BillingModel[]> = of();
  exchangeRates$: Observable<ExchangeRateModel> = of();

  private accountingService: AccountingService = inject(AccountingService);
  private destroyRef: DestroyRef = inject(DestroyRef);

  ngOnInit() {
    this.getData()
  }

  getData(): void {
    this.getUserBill();
    this.getExchangeRates();
    this.getConvertedBalance();
  }

  private getUserBill(): void {
    this.userBill$ = this.accountingService.getCurrentUserBill(this.userId);
  }

  private getExchangeRates(): void {
    this.exchangeRates$ = this.accountingService.getExchangeRates().pipe(
      map((rate: ExchangeRateModel) => {
        return {...rate, rates: {
            USD: rate.rates['USD'],
            UAH: rate.rates['UAH'],
            EUR: rate.rates['EUR']
          }
        }
      }),
      catchError(() => this.accountingService.getBackupExchangeRates())
    );
  }

  private getConvertedBalance(): void {
    this.convertedBalance$ = combineLatest([this.exchangeRates$, this.userBill$]).pipe(
      map(([rates, bill]: [ExchangeRateModel, BillingModel]) => {
        this.accountingService.updateExchangeRates(rates).pipe(
          takeUntilDestroyed(this.destroyRef)
        ).subscribe();

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
      })
    );
  }
}
