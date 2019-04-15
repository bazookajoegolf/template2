import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';




@Injectable({
  providedIn: 'root'
})
export class LoginService {

 // hostserver= "http://"+ environment.backendhost;
 hostserver = environment.backendhost + "/api/users"
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
  getProfile() {
    let myToken = localStorage.getItem('token') || " ";
 
    let Options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' ,
        'x-auth-token' : myToken
      })
    };

  return this.http.get<any>(this.hostserver+'/me', Options);
  }

  clearProfile() {
    this.httpOptions = null;
    return;
  }
  getToken() { return this.token;}

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
  signout() {
    localStorage.removeItem('token');
    
  }
}
