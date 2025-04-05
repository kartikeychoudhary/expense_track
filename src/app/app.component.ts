import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'expense_track';
  name = '';
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.name = this.authService.getName();
  }

  ngOnDestroy(): void {
    
  }
}
