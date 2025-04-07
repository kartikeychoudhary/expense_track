import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environment/environment';
import { Task } from '../modals/task.modal';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private SERVER_URL =  environment.apiUrl + 'api/v1/task';
  constructor(private router: Router, private http: HttpClient) {}

  getAllTasks() {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
    });
    return this.http.get<any>(this.SERVER_URL, { headers });
  }

  saveTask(task:Task) {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
    });
    return this.http.post<any>(this.SERVER_URL, task, { headers });
  }

  convertTask(task:Task) {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
    });
    return this.http.post<any>(this.SERVER_URL + '/convert', task, { headers });
  }

  startTask(task:Task) {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
    });
    return this.http.post<any>(this.SERVER_URL + '/start', task, { headers });
  }
}
