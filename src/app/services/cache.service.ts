import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache: Map<string, any> = new Map<string, {isValid:boolean, data:any}>();
  constructor() { }

  setCache(key: string, data: any): void {
    this.cache.set(key, {isValid:true, data:{...data}});
  }

  getCache(key: string): any {
    const cacheData = this.cache.get(key);
    if (cacheData && cacheData.isValid) {
      return cacheData.data;
    }
    return null;
  }

  clearCache(): void {
    this.cache.clear();
  }

  isValid(key: string): boolean {
    const cacheData = this.cache.get(key);
    if (cacheData) {
      return cacheData.isValid;
    }
    return false;
  }
}
