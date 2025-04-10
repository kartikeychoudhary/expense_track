import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private SERVER_URL =  environment.apiUrl + 'api/v1/home';
  constructor(private router: Router, private http: HttpClient) {}

  loadConfig() {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
    });
    return this.http.get<any>(this.SERVER_URL + '/config', { headers });
  }

  loadSettings() {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
    });
    return this.http.get<any>(this.SERVER_URL + '/settings', { headers });
  } 

  saveSettings(settings:any) {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
    });
    return this.http.post<any>(this.SERVER_URL + '/settings', settings, { headers });
  }
}