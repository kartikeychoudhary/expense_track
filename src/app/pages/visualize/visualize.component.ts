import { Component, OnInit } from '@angular/core';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';

@Component({
  selector: 'app-visualize',
  standalone: false,
  templateUrl: './visualize.component.html',
})
export class VisualizeComponent implements OnInit {
  options: GridsterConfig | undefined;
  dashboard: Array<GridsterItem> | undefined;

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
      {cols: 3, rows: 3, y: 0, x: 0, title: 'Card 1'},
      {cols: 3, rows: 3, y: 0, x: 2, title: 'Card 2'}
    ];
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
        this.dashboard.push({x: 0, y: 0, cols: 3, rows: 3, title: 'New Card'});
    }

  }

  saveLayout() {
    // Implement layout saving logic here
    console.log('Layout saved:', this.dashboard);
  }
}
