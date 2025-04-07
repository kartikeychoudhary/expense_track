import { Injectable } from '@angular/core';
import { ApplicationConstant, CurrencySymbol } from '../constants/application.constant';

@Injectable({
  providedIn: 'root'
})
export class SettingsManagerService {
  private _currentCurrency:string = 'INR';

  private _allCurrencies = Object.keys(CurrencySymbol.symbols);
  private _allCategories = ApplicationConstant.CATEGORIES;
  private _allModes = ApplicationConstant.MODE;
  private _allTypes = ApplicationConstant.TYPE;

  constructor() { 
  }

  getCurrentCurrency():string {
    return this._currentCurrency;
  }

  setCurrency(currency:string):void {
    this._currentCurrency = currency;
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
  
  
}
