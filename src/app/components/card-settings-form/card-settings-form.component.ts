import { Component, Inject, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'; // Assuming Material Dialog
import { CardFilters } from '../../modals/card-filter.modal';
import { Card } from '../../modals/card.modal'; // Assuming a Card model exists
import { TransactionService } from '../../services/transaction.service'; // Using TransactionService as requested
import { ApplicationConstant } from '../../constants/application.constant'; // For potential default options

@Component({
  selector: 'app-card-settings-form',
  standalone: false,
  templateUrl: './card-settings-form.component.html',
  })
export class CardSettingsFormComponent implements OnInit {
  settingsForm: FormGroup;
  isLoading = true;
  @Input() card: Card;

  // Options for multi-select dropdowns
  allCategories: string[] = ApplicationConstant.CATEGORIES; // Example: Use constants or fetch from API
  allAccounts: string[] = []; // Will be populated from API
  allTags: string[] = []; // Example: Potentially fetch distinct tags
  allDateRanges: string[] = ['Last 7 Days', 'Last 30 Days', 'This Month', 'This Year', 'All Time']; // Example static options
  allApplications: string[] = []; // Example: Potentially fetch
  allTransactionModes: string[] = ApplicationConstant.MODE; // Example: Use constants
  allTypes: string[] = ApplicationConstant.TYPE; // Example: Use constants
  allTransactionTypes: string[] = ['Income', 'Expense', 'Transfer']; // Example static options
  allOrderBy: string[] = ['Date', 'Amount', 'Category']; // Example static options
  allOrder: string[] = ['Ascending', 'Descending']; // Example static options


  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CardSettingsFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { card: Card }, // Assuming card data is passed in
    private transactionService: TransactionService, // Using TransactionService
    private cdRef: ChangeDetectorRef
  ) {
    this.card = data.card;
  }

  ngOnInit(): void {
    this.createForm(); // Create form structure first
    this.loadInitialData();
  }

  createForm(): void {
    const initialFilters = this.card?.filters || new CardFilters(); // Use existing filters or defaults

    this.settingsForm = this.fb.group({
      title: [this.card?.title || '', Validators.required],
      filters: this.fb.group({
        categories: [initialFilters.categories || []],
        accounts: [initialFilters.accounts || []],
        tags: [initialFilters.tags || []],
        dateRange: [initialFilters.dateRange || []], // Assuming dateRange is multi-select based on request
        applications: [initialFilters.applications || []],
        transactionModes: [initialFilters.transactionModes || []],
        types: [initialFilters.types || []],
        transactionTypes: [initialFilters.transactionTypes || []],
        // Assuming orderBy and order are single select, adjust if multi-select needed
        orderBy: [initialFilters.orderBy || 'Date'],
        order: [initialFilters.order || 'Descending']
      })
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
      const updatedSettings = {
        title: this.settingsForm.value.title,
        filters: this.settingsForm.value.filters
      };
      // Pass data back to the component that opened the dialog
      this.dialogRef.close(updatedSettings);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
