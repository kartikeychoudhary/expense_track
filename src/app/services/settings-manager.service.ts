import { Injectable } from '@angular/core';
import { ApplicationConstant, CurrencySymbol, Theme } from '../constants/application.constant';
import { ThemeEngineService } from './theme-engine.service';
import { Account } from '../modals/account.modal';
import { Settings } from '../modals/settings.modal';
import { HomeService } from './home.service';
import { isNullOrUndefinedOrEmpty } from '../utils/application.helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsManagerService {
  private _allCurrencies = Object.keys(CurrencySymbol.symbols);
  private _allCategories = ApplicationConstant.CATEGORIES;
  private _allModes = ApplicationConstant.MODE;
  private _allTypes = ApplicationConstant.TYPE;
  private _settings:Settings;
  public settingsObservable = new Subject<{event:string, data?:Settings}>();

  constructor(private themeEngine: ThemeEngineService, private homeService:HomeService) { 
    this._settings = new Settings();
  }

  get settings():Settings {
    return this._settings;
  }

  set settings(setting:Settings) {
    if(isNullOrUndefinedOrEmpty(this.themeEngine.getCurrentTheme()) || setting.theme !== this.themeEngine.getCurrentTheme()){
      this.themeEngine.setTheme(setting.theme);
    }
    this._settings = setting;
  }

  get allCurrencies():string[] {
    return this._allCurrencies;
  }

  get allCategories():string[] {
    return this._allCategories;
  }
  
  get allModes():string[] {
    return this._allModes;
  }

  get allTypes():string[] {
    return this._allTypes;
  }

  public saveSettings(settings:Settings){
    return this.homeService.saveSettings(settings.getSettingsDTO())
  }
}
