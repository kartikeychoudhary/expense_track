import { Component, Input, Output, EventEmitter, SimpleChanges, OnInit, OnChanges, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { CardSettingsFormComponent } from '../card-settings-form/card-settings-form.component'; // Import the settings form component
import { Card } from '../../modals/card.modal'; // Import the Card model
import { DashboardService } from '../../services/dashboard.service';
import { GenericResponse } from '../../modals/generic-response.modal';
import { sortedDateString } from '../../utils/application.helper';
import { Chart } from '../../modals/chart.modal';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html'
})
export class CardComponent implements OnInit, OnChanges {
  @Input() card: Card | undefined; // Input for the card data
  @Output() delete = new EventEmitter<void>();
  @Output() settingsChanged = new EventEmitter<Card>(); // Output for updated settings
  previewLabels: string[] = [];
  previewSeries: { name: string, data: number[] }[] = [];
  isPreviewLoaded = false;
  private _dashboardService: DashboardService = inject(DashboardService);
  isLoading = false;
  showMenu = false;
  isSampleCard = false;

  constructor(private dialog: MatDialog) { } // Inject MatDialog

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['card'] && changes['card'].currentValue) {
      this.card = changes['card'].currentValue;
      if(this.card.id !== 'SAMPLE_CARD'){
        this.loadChart();
      }else{
        this.isSampleCard = true;
      }
    }
  }

  ngOnInit(): void {
    // Initialization logic if needed
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  onDelete($event): void {
    this.delete.emit($event);
    this.showMenu = false; // Hide menu after action
  }

  onEdit($event: MouseEvent): void {
    $event.stopPropagation(); // Prevent event bubbling
    if (!this.card) {
      console.error("Card data is missing, cannot open settings.");
      return;
    }
    this.showMenu = false; // Hide menu when opening dialog
    const dialogRef = this.dialog.open(CardSettingsFormComponent, {
      width: '500px', // Adjust width as needed
      disableClose: true, // Prevent closing by clicking outside
      data: { card: this.card } // Pass the current card data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.card) {
        // Update the card with the new settings from the dialog
        this.card = result;
        this.settingsChanged.emit(this.card); // Emit the updated card data
      }
    });
  }

  loadChart() {
    this.isLoading = true;
    this.card.chart.isDataLoaded = false;
    this._dashboardService.getChartPreviewData(this.card).subscribe({
      next: (response: GenericResponse<string>) => {
        const data = JSON.parse(response.payload.RESULT);
        this.previewLabels = Object.keys(data);
        this.previewLabels = sortedDateString(this.previewLabels, this.card.layout.dateOptions.timeFrame);
        this.previewSeries = [];
        const allDataSets = [...this.previewLabels.reduce((map, label) => {
          Object.keys(data[label]).forEach((key) => { map.set(key, true) });
          return map;
        }, new Map<string, boolean>()).keys()];
        const result = new Map<string, number[]>();
        this.previewLabels.forEach((label) => {
          const dataset = data[label];
          allDataSets.forEach((key) => {
            const data: number = dataset[key] || 0;
            result.has(key) ? result.get(key).push(data) : result.set(key, [data]);
          });
        })
        this.previewSeries = Array.from(result).map(([key, value]) => {
          return {
            name: key,
            data: value,
          };
        });
        this.isPreviewLoaded = true;
        this.card.chart = new Chart();
        this.card.chart.data.labels = this.previewLabels;
        this.card.chart.data.series = this.previewSeries;
        this.card.chart.isDataLoaded = true;
      },
      error: (error) => {
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}