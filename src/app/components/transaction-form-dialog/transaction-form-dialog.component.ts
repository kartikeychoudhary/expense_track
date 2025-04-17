import { Component, Inject, Input, ChangeDetectorRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApplicationConstant } from '../../constants/application.constant';
import { Transaction } from '../../modals/transaction.modal';
import { SettingsManagerService } from '../../services/settings-manager.service';

@Component({
  selector: 'transaction-form-dialog',
  templateUrl: './transaction-form-dialog.component.html',
  standalone:false
})
export class TransactionFormDialogComponent {
  transactionForm: FormGroup;
  editMode= false;
  isLoading= false;
  tags:string[] = []
  tag: string = '';
  transaction: Transaction;
  date: number | null;
  categories: string[];
  modes: string[];
  types: string[];
  accounts: string[] = [];
  private settingsService:SettingsManagerService = inject(SettingsManagerService);
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<TransactionFormDialogComponent>, @Inject(MAT_DIALOG_DATA) private parameters: {transaction:Transaction, editMode:boolean}, private cdRef: ChangeDetectorRef) {
    this.categories = ApplicationConstant.CATEGORIES;
    this.modes = ApplicationConstant.MODE;
    this.types = ApplicationConstant.TYPE;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.editMode = this.parameters.editMode;
    this.transaction = this.parameters.transaction;
    this.accounts = this.settingsService.settings.accounts.map((account) => account.uniqueName);
    this.createForm();
  }

  createForm(){
    this.transactionForm = this.fb.group({
      amount:[  this.editMode && this.transaction ? this.transaction['amount']:null,    [Validators.required]],
      account:[ this.editMode && this.transaction ? this.transaction['account']:null,   [Validators.required]],
      category:[this.editMode && this.transaction ? this.transaction['category']:'',  [Validators.required]],
      mode: [   this.editMode && this.transaction ? this.transaction['transactionMode']:'', [Validators.required]],
      type: [   this.editMode && this.transaction ? this.transaction['type']:'',      [Validators.required]],
      description: [this.editMode && this.transaction ? this.transaction['description']:'null', [Validators.required]],
      spendAt: [this.editMode && this.transaction ? this.transaction['spendAt']:null, [Validators.required]],
      disableForCharts: [this.editMode && this.transaction ? this.transaction['disableForCharts']:false]
    })
    this.tags = this.transaction ? (this.transaction.tags || []) : [];
    this.date = this.transaction ? this.transaction['createdDate'] : new Date().getTime();
  }

  get dateForInput(): string {
    if (!this.date) return '';
    try {
      const d = new Date(this.date);
      const offset = d.getTimezoneOffset() * 60000;
      const localISOTime = new Date(d.getTime() - offset).toISOString().slice(0, 16);
      return localISOTime;
    } catch (e) {
      console.error("Error formatting date for input:", e);
      return '';
    }
  }

  updateDateFromInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const dateString = inputElement.value;
    if (dateString) {
        try {
          this.date = new Date(dateString).getTime();
        } catch(e) {
            console.error("Error parsing date string:", dateString, e);
            this.date = null;
        }
    } else {
        this.date = null;
    }
  }

  addTag(){
    if(this.tag !== '' && !this.tags.includes(this.tag)){
      this.tags.push(this.tag);
      this.tag = '';
    }
  }

  removeTag(tag:string){
    const filtered = this.tags.filter(t=>t!==tag);
    this.tags = filtered;
  }

  addTransaction(){
    const transactionData: Partial<Transaction> = {
      id: this.transaction ? this.transaction['id'] : undefined,
      account: this.transactionForm.value['account'],
      amount: this.transactionForm.value['amount'],
      category: this.transactionForm.value['category'],
      type: this.transactionForm.value['type'],
      transactionMode: this.transactionForm.value['mode'],
      description: this.transactionForm.value['description'],
      spendAt: this.transactionForm.value['spendAt'],
      disableForCharts: this.transactionForm.value['disableForCharts'],
      tags: this.tags,
      createdDate: this.date,
    };
    this.dialogRef.close({transaction: transactionData as Transaction, editMode:this.editMode});
  }

}
