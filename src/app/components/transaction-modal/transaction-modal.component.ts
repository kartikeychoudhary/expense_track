import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Assuming your Transaction interface is defined elsewhere and imported
// If not, define it here or import it
interface Transaction {
  date: string;
  description: string;
  category: string;
  amount: number;
  account: string;
}

@Component({
  selector: 'app-transaction-modal',
  standalone: false,
  templateUrl: './transaction-modal.component.html',
  styleUrl: './transaction-modal.component.css'
})
export class TransactionModalComponent implements OnInit, OnChanges {
  @Input() isVisible: boolean = false;
  @Input() transactionData: Transaction | null = null; // Data for editing, null for adding
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveTransaction = new EventEmitter<Transaction>();

  transactionForm: FormGroup;
  isEditing: boolean = false;

  // Example categories and accounts - replace with dynamic data if needed
  categories: string[] = ['Food', 'Transport', 'Shopping', 'Utilities', 'Entertainment', 'Health', 'Income', 'Other'];
  accounts: string[] = ['Credit Card', 'Checking', 'Savings', 'Cash', 'Other'];

  constructor(private fb: FormBuilder) {
    this.transactionForm = this.fb.group({
      date: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      amount: [null, [Validators.required, Validators.pattern(/^-?\d+(\.\d{1,2})?$/)]], // Allow numbers (positive/negative) with up to 2 decimals
      account: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Initial setup if needed
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isVisible'] && this.isVisible) {
       this.setupForm();
    } 
     if (changes['transactionData']) {
        this.setupForm();
    }
  }
  
   setupForm(): void {
     if (this.transactionData) {
        this.isEditing = true;
        // Patch form with existing data for editing
        // Format date correctly for the input type='date'
        const formattedDate = this.transactionData.date ? new Date(this.transactionData.date).toISOString().split('T')[0] : '';
        this.transactionForm.patchValue({...this.transactionData, date: formattedDate});
      } else {
        this.isEditing = false;
        this.transactionForm.reset();
         // Optionally set default values for adding
        this.transactionForm.patchValue({ date: new Date().toISOString().split('T')[0] });
      }
   }

  handleClose(): void {
    this.transactionForm.reset();
    this.closeModal.emit();
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      // Prepare data, potentially adding an ID if editing or generating one if adding
      const formData = { ...this.transactionForm.value };
      // Convert amount back to number if needed (form value might be string)
      formData.amount = parseFloat(formData.amount);
       // If editing, might need to include the original ID
       // if (this.isEditing && this.transactionData) {
       //   formData.id = this.transactionData.id; // Assuming an ID exists
       // }
      this.saveTransaction.emit(formData);
      this.handleClose(); // Close modal after saving
    } else {
      // Mark fields as touched to show validation errors
      this.transactionForm.markAllAsTouched();
    }
  }

  // Helper getters for template validation
  get date() { return this.transactionForm.get('date'); }
  get description() { return this.transactionForm.get('description'); }
  get category() { return this.transactionForm.get('category'); }
  get amount() { return this.transactionForm.get('amount'); }
  get account() { return this.transactionForm.get('account'); }
}
