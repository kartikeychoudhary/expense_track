import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { TransactionService } from '../../services/transaction.service';
import { TransactionFormDialogComponent } from '../../components/transaction-form-dialog/transaction-form-dialog.component';
import { getMillisForLast } from '../../utils/application.helper';
import { Transaction } from '../../modal/transaction.modal';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
  standalone:false
})
export class TransactionsComponent {
  actionTriggered: Function;
  isDataLoaded: boolean;
  event = new Subject();
  rowData = [];
  duration: string = '7_DAYS';
  columns: {isSelected:boolean, title:string}[];

  isViewLoaded = false;

  constructor(
    public dialog: MatDialog,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.actionTriggered = this.onActionTriggered.bind(this);
    this.loadTransactions();
    this.event.subscribe((event)=>{
      if(event['calledFrom'] && event['calledFrom'] === 'TRANSACTIONS'){return;}
      if(event['type'] && event['type'] === 'COLUMNS'){
        this.populateColumns(event['value'])
      }
    })
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    setTimeout(() => {
      this.isViewLoaded = true;
    }, 100);
  }

  openDialog(transaction?: Transaction): void {
    const config = new MatDialogConfig();
    // config.minWidth = '100%'; // Remove - Let Material handle sizing/centering
    // config.minHeight = '100%'; // Remove - Let Material handle sizing/centering
    config.data = transaction
      ? { transaction, editMode: true }
      : {
          transaction: null,
          editMode: false,
        };
    const dialogRef = this.dialog.open(TransactionFormDialogComponent, config);

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        if (result.editMode) {
          this.editTransaction(result.transaction);
        } else {
          this.addTransaction(result.transaction);
        }
      }
    });
  }

  onActionTriggered(params): void {
    switch (params['action']) {
      case 'delete':
        return this.deleteTransaction(params.data);
      case 'edit':
        return this.openEditDialog(params.data.rowData);
      default:
        return;
    }
  }

  openEditDialog(transaction?: Transaction): void {
    this.openDialog(transaction);
  }
  showLoading(value: boolean) {
    this.event.next({ type: 'LOADING', value, calledFrom:'TRANSACTIONS' });
  }
  refreshData(value: boolean) {
    this.event.next({ type: 'REFRESH', value, calledFrom:'TRANSACTIONS' });
  }

  loadTransactions() {
    this.showLoading(true);
    if(this.duration === 'ALL'){
      this.transactionService.getAllTransactions().subscribe({
        next: (res) => {
          if (res['status'] === 'OK') {
            this.rowData = res['payload']['RESULT'];
            this.showLoading(false);
          }
        },
        error: (err) => {
          this.showLoading(false);
        },
      });
    }else{
      this.transactionService.getAllTransactionsForDuration(getMillisForLast(this.duration)).subscribe({
        next: (res) => {
          if (res['status'] === 'OK') {
            this.rowData = res['payload']['RESULT'];
            this.showLoading(false);
          }
        },
        error: (err) => {
          this.showLoading(false);
        },
      });
    }
  }

  addTransaction(transaction: Transaction) {
    this.showLoading(true);
    this.transactionService.saveTransaction(transaction).subscribe({
      next: (res) => {
        if (res['status'] === 'OK') {
          const t = res['payload']['RESULT'];
          this.rowData.unshift(t);
          this.refreshData(true);
          this.showLoading(false);
        }
      },
      error: (err) => {
        this.showLoading(false);
      },
    });
  }
  editTransaction(transaction: Transaction) {
    this.showLoading(true);
    this.transactionService.saveTransaction(transaction).subscribe({
      next: (res) => {
        if (res['status'] === 'OK') {
          const t = res['payload']['RESULT'];
          this.rowData = this.rowData.filter((tt) => tt.id !== t.id);
          this.rowData.unshift(t);
          this.showLoading(false);
        }
      },
      error: (err) => {
        this.showLoading(false);
      },
    });
  }

  deleteTransaction(transaction: Transaction) {
    transaction.deleted = true;
    this.showLoading(true);
    this.transactionService.saveTransaction(transaction).subscribe({
      next: (res) => {
        if (res['status'] === 'OK') {
          const t = res['payload']['RESULT'];
          this.rowData = this.rowData.filter((tt) => tt.id !== t.id);
          this.showLoading(false);
        }
      },
      error: (err) => {
        this.showLoading(false);
      },
    });
  }

  exportCSV(){
    this.event.next({type:'EXPORT_CSV', calledFrom:'TRANSACTIONS'})
  }

  populateColumns(columns:{isSelected:boolean, title:string}[]){
    this.columns = columns;
  }
  refreshSelectedColumns(){
    this.event.next({ type: 'SHOW_HIDE_COLUMN', value:this.columns, calledFrom:'TRANSACTIONS' });
  }
}
