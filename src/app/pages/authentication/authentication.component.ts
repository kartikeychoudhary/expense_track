import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-authentication',
  standalone: false,
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent implements OnInit {

  signupForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
      // Add cross-field validator for password match later if needed
    });
  }

  onSubmitSignup(): void {
    if (this.signupForm.valid) {
      console.log('Signup Form Submitted:', this.signupForm.value);
      // Handle signup logic here
    } else {
      console.log('Signup Form is invalid');
      // Mark fields as touched to show errors
      this.signupForm.markAllAsTouched();
    }
  }

  // Add login form logic later

}
