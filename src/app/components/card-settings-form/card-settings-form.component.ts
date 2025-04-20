import { Component, Inject, OnInit, ChangeDetectorRef, Input, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'; // Assuming Material Dialog
import { CardFilters } from '../../modals/card-filter.modal';
import { Card } from '../../modals/card.modal'; // Assuming a Card model exists
import { TransactionService } from '../../services/transaction.service'; // Using TransactionService as requested
import { ApplicationConstant } from '../../constants/application.constant'; // For potential default options
import { MultiSelectItem } from '../multi-select-list/multi-select-list.component';
import { SettingsManagerService } from '../../services/settings-manager.service';
import { fadeSlideInOutForSize } from '../../animations/fadeSlideInOut.animation';
import { DashboardService } from '../../services/dashboard.service';
import { GenericResponse } from '../../modals/generic-response.modal';
import { sortedDateString } from '../../utils/application.helper';

@Component({
  selector: 'app-card-settings-form',
  standalone: false,
  templateUrl: './card-settings-form.component.html',
  animations: fadeSlideInOutForSize.animations,
})
export class CardSettingsFormComponent implements OnInit {
  private _settings: SettingsManagerService = inject(SettingsManagerService);
  private _dashboardService: DashboardService = inject(DashboardService);
  @Input() card: Card;

  settingsForm: FormGroup;
  isLoading = false;
  isPreviewLoaded = false;
  currentTab: string = 'settings';
  previewSeries = [];
  previewLabels = [];
  previewCardType = 'bar'; // Default chart type for preview

  allCategories: MultiSelectItem[] = [] // Example: Use constants or fetch from API
  allAccounts: MultiSelectItem[] = []; // Will be populated from API
  allDateTypes: MultiSelectItem[] = ['before', 'after', 'between', 'this_month', 'this_quarter', 'this_year', 'all'].map((type) => ({ value: type, label: type }));
  allTransactionModes: MultiSelectItem[] = ['all', ...ApplicationConstant.MODE].map((mode) => ({ value: mode, label: mode }));
  allTransactionTypes: MultiSelectItem[] = ['all', ...ApplicationConstant.TYPE].map((mode) => ({ value: mode, label: mode }));
  allChartTypes: MultiSelectItem[] = ApplicationConstant.ALLOWED_CHART_TYPES.map((type) => ({ value: type, label: type }));

  dimensions: MultiSelectItem[] = [{ label: 'Transaction Type', value: 'transactionType' }];
  functions: MultiSelectItem[] = [{ label: 'Sum', value: 'sum' }]

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CardSettingsFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { card: Card }, // Assuming card data is passed in
    private transactionService: TransactionService, // Using TransactionService
    private cdRef: ChangeDetectorRef
  ) {
    this.card = data.card;
    this.allCategories = ['all', ...ApplicationConstant.CATEGORIES].map((category) => ({ value: category, label: category }));
  }

  ngOnInit(): void {
    this.allAccounts = [{value:'all', uniqueName:'all'}, ...this._settings.settings.accounts].map((account) => ({ value: account.uniqueName, label: account.uniqueName }));
    this.createForm();  
  }

  createForm(): void {
    this.settingsForm = this.fb.group({
      title: [this.card?.title || '', Validators.required],
      chartOptions: this.fb.group({
        chartType: [this.card?.chart?.type || 'bar'],
        dimension: [this.card?.layout?.dimension || 'transactionType'],
        function: [this.card?.layout?.function || 'sum'],
      }),
      dateOptions: this.fb.group({
        timeFrame: [this.card?.layout?.dateOptions?.timeFrame || 'month'],
        dateType: [this.card?.layout?.dateOptions?.dateType || 'after'],
        dynamic: [this.dateForInput(this.card?.layout?.dateOptions?.range?.dynamic || new Date().getTime())],
        start: [this.dateForInput(this.card?.layout?.dateOptions?.range?.start || new Date().getTime())],
        end: [this.dateForInput(this.card?.layout?.dateOptions?.range?.end || new Date().getTime())],
      }),
      filters: this.fb.group({
        accounts: [this.card?.layout?.filters?.accounts || ['all']],
        categories: [this.card?.layout?.filters?.categories || ['all']],
        transactionModes: [this.card?.layout?.filters?.transactionModes || ['all']],
        transactionTypes: [this.card?.layout?.filters?.transactionTypes || ['all']],
      }),
    });
  }

  loadInitialData(): void {
    this.isLoading = true;
    // Using getAllAccounts as an example API call from TransactionService
    // Replace with the actual API call needed to get filter options (e.g., accounts, tags)
    // and potentially pre-selected filter values if not passed via `this.card`.
    this.transactionService.getAllAccounts().subscribe({
      next: (response) => {
        // Assuming response contains account names or relevant data
        this.allAccounts = response.map((acc: { name: string }) => acc.name); // Adjust based on actual API response structure

        // If the API should also provide other options (tags, categories etc.), populate them here.
        // Example: this.allTags = response.distinctTags;

        // If the API provides the *current* settings for the card, patch the form here.
        // Otherwise, the form is already initialized with data from `this.card` in createForm.
        // Example: this.settingsForm.patchValue(response.cardSettings);

        this.isLoading = false;
        this.cdRef.detectChanges(); // Trigger change detection
      },
      error: (err) => {
        console.error('Error loading initial data:', err);
        this.isLoading = false; // Stop loading even on error
        // Optionally, load default/constant values as fallback
        this.allAccounts = []; // Clear or set defaults
        this.cdRef.detectChanges();
      }
    });
  }

  get filtersGroup(): FormGroup {
    return this.settingsForm.get('filters') as FormGroup;
  }

  saveSettings(): void {
    if (this.settingsForm.valid) {
      const tempCard = new Card(this.card.gridsterConfig, this.card.title);
      if(this.card.id){
        tempCard.id = this.card.id;
      }
      this.updateValuesFromForm(tempCard);
      // Pass data back to the component that opened the dialog
      this.dialogRef.close(tempCard);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  selectionChange(event: any, field: string): void { }

  changeTab(tab: string) {
    this.currentTab = tab;
  }

  updateValuesFromForm(source: Card) {
    source.layout.filters.accounts = this.settingsForm.get('filters')?.get('accounts')?.value || ['all'];
    source.layout.filters.categories =  this.settingsForm.get('filters')?.get('categories')?.value || ['all'];
    source.layout.filters.transactionModes = this.settingsForm.get('filters')?.get('transactionModes')?.value || ['all'];
    source.layout.filters.transactionTypes = this.settingsForm.get('filters')?.get('transactionTypes')?.value || ['all'];
    source.layout.dateOptions.timeFrame = this.settingsForm.get('dateOptions')?.get('timeFrame')?.value || 'month';
    source.layout.dateOptions.dateType = this.settingsForm.get('dateOptions')?.get('dateType')?.value || 'after';
    source.layout.dateOptions.range.dynamic = new Date(this.settingsForm.get('dateOptions')?.get('dynamic')?.value).getTime() || new Date().getTime();
    source.layout.dateOptions.range.start = new Date(this.settingsForm.get('dateOptions')?.get('start')?.value).getTime() || new Date().getTime();
    source.layout.dateOptions.range.end = new Date(this.settingsForm.get('dateOptions')?.get('end')?.value).getTime() || new Date().getTime();
    source.layout.dimension = this.settingsForm.get('chartOptions')?.get('dimension')?.value || 'transactionType';
    source.layout.function = this.settingsForm.get('chartOptions')?.get('function')?.value || 'sum';
    source.chart.type = this.settingsForm.get('chartOptions')?.get('chartType')?.value || 'bar';
    source.title = this.settingsForm.get('title')?.value || 'New Card';
    if(this.previewSeries.length > 0 && this.previewLabels.length > 0){
      if(!source.chart.data) source.chart.data = {series: [], labels: []};
      source.chart.data.series = this.previewSeries;
      source.chart.data.labels = this.previewLabels;
      source.chart.isDataLoaded = true;
    }
  }

  onPreviewLoad(): void {
    this.isLoading = true;
    this.isPreviewLoaded = false;
    const tempCard = new Card(this.card.gridsterConfig, this.card.title);
    this.updateValuesFromForm(tempCard);
    this.previewCardType = tempCard.chart.type;
    this._dashboardService.getChartPreviewData(tempCard).subscribe({
      next: (response: GenericResponse<string>) => {
        const data = JSON.parse(response.payload.RESULT);
        // date -> dataset1: value, dataset2: value
        this.previewLabels = Object.keys(data);
        this.previewLabels = sortedDateString(this.previewLabels, tempCard.layout.dateOptions.timeFrame);
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
        console.log('Preview loaded successfully:', response);
      },
      error: (error) => {
        console.error('Error loading preview:', error);
      },
      complete: ()=>{
        this.isLoading = false;
      }
    });
  }

  isDynamicDateType(): boolean {
    const dateType = this.settingsForm.get('dateOptions')?.get('dateType')?.value;
    return ['before', 'after'].includes(dateType);
  }

  isRangeDateType(): boolean {
    const dateType = this.settingsForm.get('dateOptions')?.get('dateType')?.value;
    return ['between'].includes(dateType);
  }

  dateForInput(date:number): string {
    try {
      const d = new Date(date);
      const offset = d.getTimezoneOffset() * 60000;
      const localISOTime = new Date(d.getTime() - offset).toISOString().slice(0, 16);
      return localISOTime;
    } catch (e) {
      console.error("Error formatting date for input:", e);
      return '';
    }
  }
}
