import { Component, inject, OnInit } from '@angular/core';
import { BillingService } from '@home/billing/services/billing.service';
import { combineLatest, map, Observable, of } from 'rxjs';
import { BillingModel, ExchangeRateModel } from '@home/billing/models/billing.model';

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

  private billingService: BillingService = inject(BillingService);

  ngOnInit() {
    this.getData()
  }

  getData(): void {
    this.getUserBill();
    this.getExchangeRates();
    this.getConvertedBalance();
  }

  private getUserBill(): void {
    this.userBill$ = this.billingService.getCurrentUserBill(this.userId);
  }

  private getExchangeRates(): void {
    this.exchangeRates$ = this.billingService.getExchangeRates().pipe(
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
