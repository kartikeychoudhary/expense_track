import { Component } from '@angular/core';

@Component({
  selector: 'app-theme-toggle-button',
  templateUrl: './theme-toggle-button.component.html',
  standalone:false
})
export class ThemeToggleButtonComponent {
  isDarkMode = false; // Initial state (adjust based on preference if using localStorage)'

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.toggleTheme();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      document.body.classList.add('dark'); // Apply dark theme class
    } else {
      document.body.classList.remove('dark'); // Remove dark theme class
    }

    // Optional localStorage persistence
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }
}
