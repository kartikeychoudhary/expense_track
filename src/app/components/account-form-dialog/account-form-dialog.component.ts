import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Account } from '../../modals/account.modal';
import { AccountTypes } from '../../constants/application.constant'; // Assuming AccountTypes enum is here

@Component({
  selector: 'app-account-form-dialog',
  standalone: false,
  templateUrl: './account-form-dialog.component.html',
})
export class AccountFormDialogComponent implements OnInit {
  accountForm: FormGroup;
  editMode = false;
  account: Account;
  accountTypes = Object.values(AccountTypes); // Get values from the enum
  balanceLabel = 'Balance'; // Default label

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AccountFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { account: Account, editMode: boolean },
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.editMode = this.data.editMode;
    this.account = this.data.account || new Account(); // Use provided account or create new
    this.createForm();
    this.updateBalanceLabel(this.accountForm.get('type')?.value); // Initial label check
    this.listenForTypeChanges();
  }

  createForm(): void {
    this.accountForm = this.fb.group({
      uniqueName: [this.account.uniqueName || '', [Validators.required]],
      type: [this.account.type || AccountTypes.BANK, [Validators.required]], // Default to BANK
      balance: [this.account.balance || 0, [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/)]], // Number validation
      issuer: [this.account.issuer || ''], // Optional? Add Validators.required if needed
      icon: [this.account.icon || 'fa-piggy-bank'], // Default icon
      color: [this.account.color || '#3498db'],    // Default color
      description: [this.account.description || '']
      // Add other Account fields if necessary (is_active, is_default?)
    });
  }

  listenForTypeChanges(): void {
    this.accountForm.get('type')?.valueChanges.subscribe(value => {
      this.updateBalanceLabel(value);
      this.cdRef.detectChanges(); // Trigger change detection if label update is not reflected
    });
  }

  updateBalanceLabel(accountType: string): void {
    switch (accountType) {
      case AccountTypes.CREDIT_CARD:
        this.balanceLabel = 'Max Limit';
        break;
      case AccountTypes.LOAN:
        this.balanceLabel = 'Amount';
        break;
      case AccountTypes.BANK:
      case AccountTypes.WALLET:
      default:
        this.balanceLabel = 'Balance';
        break;
    }
  }

  onSave(): void {
    if (this.accountForm.invalid) {
      this.accountForm.markAllAsTouched(); // Show validation errors
      return;
    }

    const formData = this.accountForm.value;

    // Update the existing account instance or create a new one
    this.account.uniqueName = formData.uniqueName;
    this.account.type = formData.type;
    this.account.balance = formData.balance;
    this.account.issuer = formData.issuer;
    this.account.icon = formData.icon;
    this.account.color = formData.color;
    this.account.description = formData.description;
    // Set other properties if they exist in the form (e.g., is_active)
    // If adding a new account, ensure the ID is handled correctly (e.g., generated by backend or service)

    this.dialogRef.close({ account: this.account, editMode: this.editMode });
  }

  onCancel(): void {
    this.dialogRef.close(); // Close without sending data
  }
}
