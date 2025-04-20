import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// Define the interface for the items in the multi-select
export interface MultiSelectItem {
  value: any;
  label: string;
  disabled?: boolean; // Optional: to disable individual items
}

@Component({
  selector: 'app-multi-select-list',
  templateUrl: './multi-select-list.component.html',
  standalone:false,
  providers: [
    {
      // This allows the component to be used with Angular forms (formControl, ngModel)
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectListComponent),
      multi: true,
    },
  ],
})
export class MultiSelectListComponent { // Corrected class definition
  // Input property to receive the list of items
  @Input() items: MultiSelectItem[] = [];
  // Input property for a placeholder text
  @Input() placeholder: string = 'Select items';

  @Input() options: {placement:string} = {placement:'bottom'};

  // Internal state to hold the currently selected values
  selectedValues: any[] = [];
  // Internal state to track if the dropdown is open
  isOpen = false;
  // Internal state to track disabled state from the form control
  isDisabled = false;

  // --- ControlValueAccessor methods ---

  // Called by the forms module to write a value to the component
  writeValue(obj: any[]): void {
    if (obj && Array.isArray(obj)) {
      this.selectedValues = obj;
    } else {
      this.selectedValues = [];
    }
  }

  // Called by the forms module when the component's value changes
  onChange: (value: any[]) => void = () => {};

  // Called by the forms module when the component is touched
  onTouched: () => void = () => {};

  // Register the change function
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Register the touched function
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Called by the forms module to set the disabled state
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  // --- Component Logic ---

  // Toggles the open/close state of the dropdown
  toggleDropdown(): void {
    if (!this.isDisabled) {
      this.isOpen = !this.isOpen;
      this.onTouched(); // Mark as touched when the dropdown is interacted with
    }
  }

  // Handles item selection/deselection
  onItemClick(item: MultiSelectItem): void {
    if (this.isDisabled || item.disabled) {
      return;
    }

    const index = this.selectedValues.indexOf(item.value);

    if (index === -1) {
      // Item not selected, add it
      this.selectedValues = [...this.selectedValues, item.value];
    } else {
      // Item is selected, remove it
      this.selectedValues = this.selectedValues.filter(
        (value) => value !== item.value
      );
    }

    // Notify the forms module about the change
    this.onChange(this.selectedValues);
  }

  // Checks if an item is currently selected
  isSelected(item: MultiSelectItem): boolean {
    return this.selectedValues.includes(item.value);
  }

  // Gets the labels of the selected items for display
  getSelectedLabels(): string {
    if (this.selectedValues.length === 0) {
      return this.placeholder;
    }
    const selectedItems = this.items.filter((item) =>
      this.selectedValues.includes(item.value)
    );
    return selectedItems.map((item) => item.label).join(', ');
  }

  // Prevents the dropdown from closing when clicking inside it
  preventClose(event: Event): void {
    event.stopPropagation();
  }

  selectAll(): void {
    this.selectedValues.forEach(((value) => this.onItemClick(value)));
  }
  clearAll(): void {  
    this.selectedValues.forEach((value) => {value.selected = false;});
    this.onChange(this.selectedValues);
  }
}
