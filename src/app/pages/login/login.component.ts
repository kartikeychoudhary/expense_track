import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone:false
})
export class LoginComponent {

  loginForm: FormGroup;
  registerForm: FormGroup;
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$"; 

  passwordMismatch= false;
  loginMode= true;
  isLoading= false;
  constructor(private fb: FormBuilder, private authService:AuthService, private router: Router){

  }

  ngOnInit(): void {
    this.createForm();
  }

  getFormGroup(): FormGroup{
    if(this.loginMode){
      return this.loginForm;
    }else {
      return this.registerForm;
    }
  }

  createForm(){
    if(this.loginMode){
      this.loginForm = this.fb.group({
        email:['',[Validators.required,Validators.pattern(this.emailPattern)]],
        password: ['', Validators.required]
      })
    }else {
      this.registerForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email:['',[Validators.required,Validators.pattern(this.emailPattern)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
      })
    }
  }

  toggleLoginRegister(){
    if(this.loginMode){
      this.loginMode = false
    }else {
      this.loginMode = true
    }
    this.createForm()
  }

  login(){
    if(this.loginMode){
      if(this.loginForm.valid){
        this.isLoading = true;
        this.authService.authenticate(this.loginForm.value.email, this.loginForm.value.password).subscribe(
          {
            next: (response)=>{
            this.isLoading = false;
            const {firstname, lastname, email, profilePicURL} = response.user;
            this.authService.parseUserInfo(firstname, lastname, email, profilePicURL);
            this.authService.storeToken(response.access_token, response.refresh_token);
            this.authService.loginEvent.next(this.authService.getUserInfo());
            this.router.navigate([''])
          },
          error: (err)=>{
            this.isLoading = false;
          }}
        )
      }
    }else {
      this.passwordMismatch = false;
      if(this.registerForm.value.password !== this.registerForm.value.confirmPassword){
        this.passwordMismatch = true;
      }
      if(this.registerForm.valid && !this.passwordMismatch){
        this.isLoading = true;
        this.authService.register(this.registerForm.value.email , this.registerForm.value.password, this.registerForm.value.firstName, this.registerForm.value.lastName).subscribe(
          {
            next: (response)=>{
            this.isLoading = false;
            const {firstname, lastname, email, profilePicURL} = response.user;
            this.authService.parseUserInfo(firstname, lastname, email, profilePicURL);
            this.authService.storeToken(response.access_token, response.refresh_token);
            this.authService.loginEvent.next(this.authService.getUserInfo());
            this.router.navigate([''])
          },
          error: (err)=>{
            this.isLoading = false;
          }}
        )
      }
    }
  }

}
