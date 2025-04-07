import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html'
})
export class CardComponent {
  @Input() title: string = 'Default Title';
  @Output() delete = new EventEmitter<void>();

  showMenu = false;

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  onDelete(): void {
    this.delete.emit();
    this.showMenu = false; // Hide menu after action
  }
}
