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

   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'x-auth-token'
    })
  };

  constructor(private http: HttpClient) { 

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
}
