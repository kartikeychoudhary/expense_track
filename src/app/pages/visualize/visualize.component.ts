import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { Card } from '../../modals/card.modal';
import { Gridster } from '../../modals/gridster.modal';
import { DashboardService } from '../../services/dashboard.service';
import { GenericResponse } from '../../modals/generic-response.modal';
import _ from 'lodash';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-visualize',
  standalone: false,
  templateUrl: './visualize.component.html',
})
export class VisualizeComponent implements OnInit, AfterViewInit {
  dashboardService:DashboardService = inject(DashboardService);

  options: GridsterConfig | undefined;
  dashboard: Array<Card> | undefined;
  editMode = false
  isLoading = false;
  saveDashboardLoading = false;
  public eventSubject = new Subject<{id:string, type:string}>();
  private isViewLoaded = false;

  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef) 
  itemChange(item: any, itemComponent: any) {
    console.info('itemChanged', item, itemComponent);
  }

  itemResize(item: any, itemComponent: any) {
    const cardId = itemComponent.el.id
    if(this.isViewLoaded){
      this.eventSubject.next({id:cardId, type:'ITEM_RESIZED'})
    }
    console.info('itemResized', item, itemComponent);
  }
  ngAfterViewInit(): void {
    this.isViewLoaded = true;
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
      itemChangeCallback: this.itemChange.bind(this),
      itemResizeCallback: this.itemResize.bind(this),
      draggable: {
        enabled: true,
        ignoreContentClass: 'no-drag'
      },
      resizable: {
        enabled: true
      }
      
    };

    this.loadDashboard();
    this.gridsterSettingsChanged()
  }

  loadDashboard() {
    this.isLoading = true;
    this.dashboardService.getVisualizeDashboard().subscribe((data:GenericResponse<{dashboard:string, visualizeId:number}>) => {
      const dashboard = JSON.parse(data.payload.RESULT.dashboard);
      if(Array.isArray(dashboard) && dashboard.length === 0) {
        this.isLoading = false;
        this.dashboard = [];
        setTimeout(() => {
          this.addItem(true);
          this.cdr.detectChanges(); 
        }, 200);
      }
      this.dashboard = dashboard.map((card: any) => {
        return Card.getCardFromJson(card);
      })
      this.isLoading = false;
    });
  }

  saveDashboard() {
    this.saveDashboardLoading = true;
    let currentDashboard = _.cloneDeep(this.dashboard);
    currentDashboard.forEach(card=>delete card?.chart?.['data'])
    this.dashboardService.updateVisualizeDashboard(currentDashboard).subscribe((data:GenericResponse<string>) => {
      this.saveDashboardLoading = false;
    }
    );
  }

  removeItem($event: any, item: any) {
    $event.preventDefault();
    $event.stopPropagation();
    if(this.dashboard) {
        this.dashboard.splice(this.dashboard.indexOf(item), 1);
    }
  }

  addItem(isSampleCard?:boolean) {
    if(this.dashboard){
        this.dashboard.push(new Card(new Gridster(10, 10, 0, 0), 'New Card', isSampleCard));
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

  onSettingsChanged(updatedCard:Card) {
    this.dashboard.forEach((card:Card) => { 
      if(card.id === updatedCard.id) {
        card.updateCard(updatedCard);
      }
    })
    if (this.options) {
      this.options.api?.optionsChanged?.(); 
    }
  }
}
