import { Component, inject, OnInit } from '@angular/core';
import { combineLatest, map, Observable, of } from 'rxjs';
import { BillingModel, ExchangeRateModel } from '@home/models/billing.model';
import { AccountingService } from '@home/services/accounting.service';

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
      })
    );
  }

  private getConvertedBalance(): void {
    this.convertedBalance$ = combineLatest([this.exchangeRates$, this.userBill$]).pipe(
      map(([rates, bill]: [ExchangeRateModel, BillingModel]) => {
        return [
          {
            ...bill,
            currency: '€',
          },
          {
            ...bill,
            currency: '$',
            value: bill.value * rates.rates['USD']
          },
          {
            ...bill,
            currency: '₴',
            value: bill.value * rates.rates['UAH']
          }
        ];
      })
    );
  }
}
