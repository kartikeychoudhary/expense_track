import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { CardSettingsFormComponent } from '../card-settings-form/card-settings-form.component'; // Import the settings form component
import { Card } from '../../modals/card.modal'; // Import the Card model

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html'
})
export class CardComponent {
  @Input() card: Card | undefined; // Input for the card data
  @Output() delete = new EventEmitter<void>();
  @Output() settingsChanged = new EventEmitter<Card>(); // Output for updated settings

  showMenu = false;

  constructor(private dialog: MatDialog) {} // Inject MatDialog

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  onDelete(): void {
    this.delete.emit();
    this.showMenu = false; // Hide menu after action
  }

  onEdit(): void {
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
        this.card.title = result.title;
        this.card.filters = result.filters;
        this.settingsChanged.emit(this.card); // Emit the updated card data
        console.log('Card settings updated:', this.card);
      }
    });
  }
}