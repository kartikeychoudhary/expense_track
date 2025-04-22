import { Component, inject, Input, OnInit } from '@angular/core';
import { SettingsManagerService } from '../../../services/settings-manager.service';
import { formatNumberWithCurrencySuffix } from '../../../utils/application.helper';

@Component({
  selector: 'app-stats',
  standalone: false,
  templateUrl: './stats.component.html'
})
export class StatsComponent implements OnInit{
  private _settingsService: SettingsManagerService = inject(SettingsManagerService);
  @Input() series: { name: string, color: string, data: number[] }[] = [];
  @Input() labels: string[] = [];

  public stats: {label:String, amount:string, subLabel:string}[] = []


  ngOnInit(): void {
    this.series.forEach(dataset=>{
      this.stats.push({
        label:dataset.name,
        amount: formatNumberWithCurrencySuffix(dataset.data.reduce((a, b) => a + b, 0), this._settingsService.currencySymbol),
        subLabel: this.labels[0] + ' - ' + this.labels[this.labels.length-1]
      })
    })
  }
}
