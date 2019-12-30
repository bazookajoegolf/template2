import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AdminusersService {

 hostserver = environment.backendhost + "/api/admin/"
 authserver = environment.backendhost + "/api/auth"
 // hostserver="http://localhost:3000/api/users";
 token = localStorage.getItem('token') || " ";
 
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' ,
      'x-auth-token' : this.token
    })
  };

  constructor(private http: HttpClient) { 
   
  }

  adminGetUsers() {
    let myToken = localStorage.getItem('token') || " ";
 
    let Options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' ,
        'x-auth-token' : myToken
      })
    };

  //  return this.http.get<any>(this.hostserver+'/me', Options);
    return this.http.get<any>(this.hostserver, Options)
  }

  adminGetEmailAddress(email) {
    let myToken = localStorage.getItem('token') || " ";
 
    let Options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' ,
        'x-auth-token' : myToken
      })
    };

  //  return this.http.get<any>(this.hostserver+'/me', Options);
    return this.http.get<any>(this.hostserver + email, Options)
  }

  adminGetSortedUsers(a,b,c,d) {
    let myToken = localStorage.getItem('token') || " ";
    let query = `?sort=${a}&order=${b}&pagelength=${c}&page=${d}`;
 
    let Options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' ,
        'x-auth-token' : myToken
      })
    };

  
    return this.http.get<any>(this.hostserver + query, Options)
  }
}
