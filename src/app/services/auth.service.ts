import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { UserInfo } from '../modals/user.modal';
import { Router } from '@angular/router';
import { environment } from '../../environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = environment.apiUrl;
  authURL = "api/v1/auth/";

  private loggedInUser: UserInfo | undefined;

  private _authToken: string | null;
  private _refreshToken: string | null;

  private checkToken = true;

  loginEvent: Subject<UserInfo> = new Subject<UserInfo>();

  constructor(private router: Router, private httpClient: HttpClient) {
    this._authToken = localStorage.getItem('authToken');
    this._refreshToken = localStorage.getItem('refreshToken');
    const savedUser = localStorage.getItem('userInfo')
    if(savedUser){
      const {firstname, lastname, email, profilePicURL} = JSON.parse(savedUser);
      this.parseUserInfo(firstname, lastname, email, profilePicURL);
    }
  }

  authenticate(email:string , password:string): Observable<any> {
    return this.httpClient.post(this.baseURL + this.authURL +'authenticate', {email, password});
  }

  refreshToken(): Observable<any> {
    return this.httpClient.post(this.baseURL + this.authURL +'refresh-token', {}, {headers: {'Authorization': `Bearer ${this.refreshToken}`}});
  }

  register(email:string , password:string, firstname:string, lastname:string): Observable<any> {
    return this.httpClient.post(this.baseURL + this.authURL +'register', {email, password, firstname, lastname});
  }
  
  storeToken(authToken: string, refreshToken: string) {
    this._authToken = authToken;
    this._refreshToken = refreshToken;
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('userInfo', JSON.stringify(this.loggedInUser))
  }

  clearToken(){
    this._authToken = null;
    this._refreshToken = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userInfo');
  }

  retrieveState(){
    this._authToken = localStorage.getItem('authToken');
    this._refreshToken = localStorage.getItem('refreshToken')
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return (!!this._authToken) && (!!this.loggedInUser);
  }

  parseUserInfo(firstname:string, lastname:string, email:string, profilePicURL:string, access_token?:string, refresh_token?:string){
    this.loggedInUser = {
      firstname,
      lastname,
      email,
      profilePicURL,
      accessToken:access_token,
      refreshToken:refresh_token
    }
  }

  getName():string {
    if(this.loggedInUser){
      return this.loggedInUser.firstname + ' ' + this.loggedInUser.lastname
    }
    return 'User not Logged In'
  }

  logout(): void {
    this.loggedInUser = undefined;
    this.loginEvent.next(undefined);
    this.clearToken();
    this.router.navigateByUrl('/login');
  }
  public getAuthToken(){
    return this._authToken
  }

  public getRefreshToken(){
    return this._refreshToken
  }
  
  public getUserInfo(){
    return this.loggedInUser
  }

}
