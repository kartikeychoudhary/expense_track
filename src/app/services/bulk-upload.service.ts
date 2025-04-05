import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environment/environment';
import { saveAs } from 'file-saver';


@Injectable({
  providedIn: 'root'
})
export class BulkUploadService {
  private SERVER_URL = environment.apiUrl + 'api/v1/bulkUpload';
  constructor(private router: Router, private http: HttpClient) {}

  downloadTemplate() {
    const HTTPOptions = {
      headers: new HttpHeaders({
         'Accept':'application/pdf'
      }),
      'responseType': 'blob' as 'json'
   }
    
    this.http.get<Blob>(this.SERVER_URL, HTTPOptions).subscribe(
      {
        next: (resultBlob: Blob)=>{
          const fileName = 'template.csv';
          saveAs(resultBlob, fileName);
        },
        error: (err)=>{

        }
      }
    )
  }

  previewTemplate(selectedFile: File){
    const formData = new FormData();
    formData.append('file', selectedFile);
    return this.http.post<any>(this.SERVER_URL, formData);
  }

  submitTemplate(selectedFile: File){
    const formData = new FormData();
    formData.append('file', selectedFile);
    return this.http.post<any>(this.SERVER_URL + '/submit', formData);
  }
}
