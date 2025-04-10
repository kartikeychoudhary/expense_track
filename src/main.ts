import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ModuleRegistry, NumberEditorModule, TextEditorModule } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community';
import { ValidationModule } from 'ag-grid-community';
import { PaginationModule } from 'ag-grid-community';
import { CellStyleModule } from 'ag-grid-community';
import { TextFilterModule, NumberFilterModule, DateFilterModule } from 'ag-grid-community';
import { RowSelectionModule } from 'ag-grid-community';
import { ColumnApiModule } from 'ag-grid-community';
import { CsvExportModule } from 'ag-grid-community';

import { AppModule } from './app/app.module';

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ValidationModule,
  PaginationModule,
  CellStyleModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  RowSelectionModule,
  ColumnApiModule,
  CsvExportModule,
  TextEditorModule,
  NumberEditorModule
]);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
