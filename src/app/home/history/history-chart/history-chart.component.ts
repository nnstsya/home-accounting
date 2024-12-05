import { Component, input, InputSignal, OnInit } from '@angular/core';
import Highcharts from 'highcharts';
import { EventCategoryModel, ExtendedEventModel } from '@home/models/event.model';

@Component({
  selector: 'app-history-chart',
  templateUrl: './history-chart.component.html'
})
export class HistoryChartComponent implements OnInit {
  data: InputSignal<ExtendedEventModel[]> = input.required<ExtendedEventModel[]>();

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  ngOnInit() {
    const outcomeEvents: ExtendedEventModel[] = this.data().filter((event: ExtendedEventModel) => event.type === 'Outcome');

    const groupedByCategory = outcomeEvents.reduce((acc: { [key: string]: number }, event) => {
      const category: EventCategoryModel = event.category;
      if (category) {
        if (!acc[category.name]) {
          acc[category.name] = 0;
        }
        acc[category.name] += event.amount;
      }
      return acc;
    }, {} as { [key: string]: number });

    const pieChartData = Object.keys(groupedByCategory).map(key => ({
      name: key,
      y: groupedByCategory[key]
    }));

    const colors = Highcharts.getOptions().colors!.map((c, i) =>
      Highcharts.color(Highcharts.getOptions().colors![0])
        .brighten((i - 3) / 7)
        .get()
    );

    this.chartOptions = {
      chart: {
        backgroundColor: 'none'
      },
      credits: {
        text: ''
      },
      title: {
        text: ''
      },
      series: [
        {
          dataLabels: {
            style: {
              fontSize: '18'
            }
          },
          colors,
          type: 'pie',
          name: 'Amount',
          data: pieChartData
        }
      ]
    };
  }
}
