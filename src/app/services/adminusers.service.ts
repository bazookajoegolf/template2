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


  adminDeleteUser(id) {
    console.log("deleting user ...");
    let myToken = localStorage.getItem('token') || " ";
 
    let Options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' ,
        'x-auth-token' : myToken
      })
    };

  //  return this.http.get<any>(this.hostserver+'/me', Options);
    return this.http.delete<any>(this.hostserver + id, Options)
  }

  adminUpdateUser(id, post) {
    let myToken = localStorage.getItem('token') || " ";
 
    let Options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' ,
        'x-auth-token' : myToken
      })
    };
    return this.http.put<any>(this.hostserver + id, post, Options);

  }

  adminUpdateUserPassword(id, post) {
    let myToken = localStorage.getItem('token') || " ";
 
    let Options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' ,
        'x-auth-token' : myToken
      })
    };
    return this.http.put<any>(this.hostserver + "pw/" + id, post, Options);

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

  adminCreateNewUser(post) {
    let myToken = localStorage.getItem('token') || " ";

    let Options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' ,
        'x-auth-token' : myToken
      })
    };

    return this.http.post(this.hostserver, post, Options);
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
