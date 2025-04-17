import { Component, OnInit } from '@angular/core';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { Card } from '../../modals/card.modal';
import { Gridster } from '../../modals/gridster.modal';

@Component({
  selector: 'app-visualize',
  standalone: false,
  templateUrl: './visualize.component.html',
})
export class VisualizeComponent implements OnInit {
  options: GridsterConfig | undefined;
  dashboard: Array<Card> | undefined;
  editMode = false

  static itemChange(item: any, itemComponent: any) {
    console.info('itemChanged', item, itemComponent);
  }

  static itemResize(item: any, itemComponent: any) {
    console.info('itemResized', item, itemComponent);
  }

  ngOnInit() {
    this.options = {
      gridType: 'fit',
      outerMargin: false,
      pushItems: true,
      maxCols: 20,
      minCols: 20,
      maxRows: 20,
      minRows: 20,
      fixedColWidth: 25,
      fixedRowHeight: 25,
      itemChangeCallback: VisualizeComponent.itemChange,
      itemResizeCallback: VisualizeComponent.itemResize,
      draggable: {
        enabled: true
      },
      resizable: {
        enabled: true
      }
      
    };

    this.dashboard = [
      new Card(new Gridster(3, 3, 0, 0), 'Card 1'),
    ];
    this.gridsterSettingsChanged()
  }

  removeItem($event: any, item: any) {
    $event.preventDefault();
    $event.stopPropagation();
    if(this.dashboard) {
        this.dashboard.splice(this.dashboard.indexOf(item), 1);
    }
  }

  addItem() {
    if(this.dashboard){
        this.dashboard.push(new Card(new Gridster(3, 3, 0, 0), 'New Card'));
    }

  }

  saveLayout() {
    // Implement layout saving logic here
    console.log('Layout saved:', this.dashboard);
  }

  onEditToggle() {
    this.editMode = !this.editMode;
    this.gridsterSettingsChanged()
  }

  gridsterSettingsChanged() {
    if (!this.options || !this.options.draggable || !this.options.resizable) {
      return; // Guard against options not being initialized
    }
    if (this.editMode) {
      this.options.draggable.enabled = true;
      this.options.resizable.enabled = true;
    } else {
      this.options.draggable.enabled = false;
      this.options.resizable.enabled = false;
    }
    // Notify gridster about the changes
    if (this.options) {
      this.options.api?.optionsChanged?.(); // Call optionsChanged if api exists
    }
  }
}
