import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environment/environment';
import { Card } from '../modals/card.modal';

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

  getChartPreviewData(card: Card) {
    const cardDTO = {
      ...card,
    }
    delete cardDTO['chart'];
    const headers = new HttpHeaders({
      'content-type': 'application/json',
    });
    return this.http.post<any>(this.SERVER_URL + '/visualize/preview', JSON.stringify(cardDTO), { headers });
  }

  getVisualizeDashboard() {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
    });
    return this.http.get<any>(this.SERVER_URL + '/visualize', { headers });
  }

  updateVisualizeDashboard(dashboard: Card[]) {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
    });
    return this.http.post<any>(this.SERVER_URL + '/visualize', {visualizeId: null, dashboard:JSON.stringify(dashboard)}, { headers });
  }

}
