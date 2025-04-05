import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BulkUploadService } from '../../services/bulk-upload.service';
import { formatDate } from '../../utils/application.helper';



@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  standalone:false
})
export class BulkUploadComponent {
  selectedFile: File;
  uploadMessage: string;
  submitDisabled = false;
  transactions = [];

  public steps:any;
  constructor(private bulkService: BulkUploadService, private router: Router){
    this.steps = {
      'downloadTemplate': {status: 'pending', label:'Download template'},
      'uploadTemplate': {status: 'pending',  label:'Upload template'},
      'previewTemplate': {status: 'pending', label:'Preview template'},
      'submitTemplate': {status: 'pending', label:'Submit template'},
      'jobCompleted': {status: 'pending', label:'Job Completed'},
    }  
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  downloadTemplate(){
    this.bulkService.downloadTemplate();
  }

  uploadCSV() {
    this.submitDisabled = true;
    if (!this.selectedFile) {
      alert('Please select a CSV file to upload.');
      this.submitDisabled = false;
      return;
    }
    this.bulkService.previewTemplate(this.selectedFile).subscribe({
      next: (res)=>{
        this.transactions = res['payload']['RESULT']
        this.submitDisabled = false;
        this.steps.uploadTemplate.status = 'completed'
        this.steps.downloadTemplate.status = 'completed'
      },
      error: (err)=>{
        console.log(err)
        this.submitDisabled = false;
      }
    })
  }

  submitCSV() {
    this.submitDisabled = true;
    if (!this.selectedFile) {
      alert('Please select a CSV file to upload.');
      this.submitDisabled = false;
      return;
    }
    if(confirm("Are you sure you want to continue? \nNote: This action is irreversible"))
    this.bulkService.submitTemplate(this.selectedFile).subscribe({
      next: (res)=>{
        // this.transactions = res['payload']['RESULT']
        this.submitDisabled = false;
        this.steps.uploadTemplate.status = 'completed'
        this.steps.downloadTemplate.status = 'completed'
        this.steps.previewTemplate.status = 'completed'
        this.steps.submitTemplate.status = 'completed'
        this.steps.jobCompleted.status = 'completed'
        setTimeout(() => {
          this.router.navigate(['']);
        }, 1000);
      },
      error: (err)=>{
        console.log(err)
        this.submitDisabled = false;
      }
    })
  }

  getFormatedDate(millis){
    return formatDate(millis);
  }

}
