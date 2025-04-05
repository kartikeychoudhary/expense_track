import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone:false
})
export class HomeComponent {

  selectedDate: Date;

  handleDateTime(date:any) {
    console.log(date);
  }

  constructor(private homeService:HomeService, private authService:AuthService){

  }

  loadUser = ()=>{
    this.homeService.loadConfig().subscribe({
      next:(res)=>{
        const { firstname, lastname, email, profilePicURL} = res;
        this.authService.parseUserInfo(firstname, lastname, email, profilePicURL);
      },
      error:(error)=>{
          if (error instanceof HttpErrorResponse && error.status === 401) {
            // Handle 401 (Unauthorized) error here (e.g., logout and redirect)
            this.authService.logout();
          } else {
          }
      }
    })
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadUser();
  }
}
