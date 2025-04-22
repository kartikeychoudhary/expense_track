import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { Card } from '../../modals/card.modal';
import { Gridster } from '../../modals/gridster.modal';
import { DashboardService } from '../../services/dashboard.service';
import { GenericResponse } from '../../modals/generic-response.modal';
import _ from 'lodash';
import { Subject } from 'rxjs';
import { GridItemHTMLElement, GridStack, GridStackNode, GridStackOptions } from 'gridstack';
import { GridstackComponent, nodesCB } from 'gridstack/dist/angular';
import { LayoutManagerService } from '../../services/layout-manager.service';
@Component({
  selector: 'app-visualize',
  standalone: false,
  templateUrl: './visualize.component.html',
})
export class VisualizeComponent implements OnInit, AfterViewInit {
  dashboardService: DashboardService = inject(DashboardService);
  layoutService: LayoutManagerService = inject(LayoutManagerService);

  @ViewChild('gridstack') gridstackComponent!: GridstackComponent;
  grid!: GridStack;

  options: GridStackOptions;
  dashboard: Array<Card> | undefined;
  editMode = false
  isLoading = false;
  saveDashboardLoading = false;
  public eventSubject = new Subject<{ id: string, type: string }>();
  private isViewLoaded = false;

  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef)
  itemChange(item: any, itemComponent: any) {
    console.info('itemChanged', item, itemComponent);
  }

  itemResize(item: any, itemComponent: any) {
    const cardId = itemComponent.el.id
    if (this.isViewLoaded) {
      this.eventSubject.next({ id: cardId, type: 'ITEM_RESIZED' })
    }
    console.info('itemResized', item, itemComponent);
  }
  ngAfterViewInit(): void {
    this.isViewLoaded = true;
    setTimeout(() => {
      if (this.gridstackComponent?.grid) {
        this.grid = this.gridstackComponent.grid;
        console.log('GridStack instance:', this.grid);
      } else {
        console.warn('GridstackComponent or its grid not available yet in ngAfterViewInit.');
      }
    }, 100);
  }

  ngOnInit() {
    this.options = {
      animate: false,
      margin: 5,
      cellHeight: '10vh',
      float: true,
      columnOpts: {
        columnWidth: 100,
        layout: 'move'
      },
      staticGrid: true
    };
    this.loadDashboard();
    this.gridsterSettingsChanged()
  }

  loadDashboard() {
    this.isLoading = true;
    this.dashboardService.getVisualizeDashboard().subscribe((data: GenericResponse<{ dashboard: string, visualizeId: number }>) => {
      const dashboard = JSON.parse(data.payload.RESULT.dashboard);
      if (Array.isArray(dashboard) && dashboard.length === 0) {
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

    this.grid.getGridItems().forEach((item: GridItemHTMLElement) => {
      const itemData = item.gridstackNode;
      const id = itemData.el.id;
      const { h, w, x, y } = itemData;
      this.dashboard.forEach(card => {
        if (card.id === id) {
          card.gridsterConfig.x = x;
          card.gridsterConfig.y = y;
          card.gridsterConfig.cols = w;
          card.gridsterConfig.rows = h;
        }
      })
    })

    let currentDashboard = _.cloneDeep(this.dashboard);
    currentDashboard.forEach(card => delete card?.chart?.['data'])
    this.dashboardService.updateVisualizeDashboard(currentDashboard).subscribe((data: GenericResponse<string>) => {
      this.saveDashboardLoading = false;
    }
    );
  }

  removeItem($event: any, item: any) {
    $event.preventDefault();
    $event.stopPropagation();
    if (this.dashboard) {
      this.dashboard.splice(this.dashboard.indexOf(item), 1);
    }
  }

  addItem(isSampleCard?: boolean) {
    if (this.dashboard) {
      this.dashboard.push(new Card(new Gridster(2, 2, 0, 0), 'New Card', isSampleCard));
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
    if (!this.grid) {
      return; // Guard against options not being initialized
    }
    this.grid.setStatic(!this.editMode)
  }

  onSettingsChanged(updatedCard: Card) {
    this.dashboard.forEach((card: Card) => {
      if (card.id === updatedCard.id) {
        card.updateCard(updatedCard);
      }
    })
  }

  public onChange(data: nodesCB) {
    const nodes = data.nodes;
  }
}
