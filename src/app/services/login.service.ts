import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import { catchError, map, tap } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class LoginService {

 // hostserver= "http://"+ environment.backendhost;
 hostserver = environment.backendhost + "/api/users"
 authserver = environment.backendhost + "/api/auth"
 resetserver=  environment.backendhost + "/api/reset";
 token = localStorage.getItem('token') || " ";
 
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' ,
      'x-auth-token' : this.token
    })
  };


  constructor(private http: HttpClient) { 
    
  }
  getProfile() {
    let myToken = localStorage.getItem('token') || " ";
 
    let Options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' ,
        'x-auth-token' : myToken
      })
    };

  //  return this.http.get<any>(this.hostserver+'/me', Options);
    return this.http.get<any>(this.hostserver+'/me/', Options)
  }

  updateProfile(id,input) {
    let myToken = localStorage.getItem('token') || " ";
    let UpdateOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' ,
        'x-auth-token' : myToken
      })
    };
    return this.http.put<any>(this.hostserver +'/' + id, input, UpdateOptions);
  }

  updatePassword(id,input) {
    let myToken = localStorage.getItem('token') || " ";
    let PasswordOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' ,
        'x-auth-token' : myToken
      })
    };
    return this.http.put<any>(this.hostserver +'/' + id, input, PasswordOptions);
  }

  clearProfile() {
    this.httpOptions = null;
    return;
  }
  getToken() { return this.token;}

  isLoggedIn() {
    const token = localStorage.getItem('token');
    if(!token) return false;

    let jwtHelper = new JwtHelperService();
    const isExpired = jwtHelper.isTokenExpired(token);
    
    return !isExpired;
  }

  isAdmin() {
    const token = localStorage.getItem('token');
    if(!token) return false;

    let jwtHelper = new JwtHelperService();
    const decrptedValue = jwtHelper.decodeToken(token);
    const isExpired = jwtHelper.isTokenExpired(token);
    
    if(decrptedValue.isadmin && !isExpired) return true;
    else return false;
  }

  get CurrentUser() {
    let token = localStorage.getItem('token');
    if(!token) return null;

    return new JwtHelperService().decodeToken(token);

  }

  signin(input) {
    return this.http.post<any>(this.authserver, input, this.httpOptions)
  }

  confirm(input) {
    let confirmid= input.confirmid
    return this.http.post(this.hostserver+'/'+confirmid,input,this.httpOptions);
  }

  signup(input) {
    return this.http.post(this.hostserver ,input, this.httpOptions)

  }

  reset(input) {
    return this.http.post(this.resetserver, input, this.httpOptions )
  }

  resetConfirm(id,input) {
    return this.http.post(this.resetserver + '/'+ id, input, this.httpOptions )
  }


  signout() {
    localStorage.removeItem('token');
    
  }
}
