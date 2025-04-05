import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class GenaiService {
  private SERVER_URL =  environment.apiUrl + 'api/v1/genAi';
  constructor(private router: Router, private http: HttpClient) {}

  sendGenaiPrompt(prompt:string) {
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain',
    });
    return this.http.post<any>(this.SERVER_URL, prompt, { headers });
  }
}