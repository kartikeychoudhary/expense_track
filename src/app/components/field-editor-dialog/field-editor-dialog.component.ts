import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TransactionFormDialogComponent } from '../transaction-form-dialog/transaction-form-dialog.component';

@Component({
  selector: 'app-field-editor-dialog',
  templateUrl: './field-editor-dialog.component.html',
  standalone:false
})
export class FieldEditorDialogComponent {

  value: string;
  field: string;
  refrence: string;

  constructor(public dialogRef: MatDialogRef<TransactionFormDialogComponent>, @Inject(MAT_DIALOG_DATA) private parameters: {field:string, value:string, refrence?:string}){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.value = this.parameters.value;
    this.field = this.parameters.field;
    this.refrence = this.parameters.refrence;
  }
}
