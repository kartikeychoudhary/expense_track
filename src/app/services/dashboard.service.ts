import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private SERVER_URL = environment.apiUrl + 'api/v1/dashboard';
  constructor(private router: Router, private http: HttpClient) {}

  getAllTransactionsForDashboard(date:any) {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
    });
    return this.http.get<any>(this.SERVER_URL + '/after/' + date, { headers });
  }

}
