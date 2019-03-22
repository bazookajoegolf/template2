import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'x-auth-token'
    })
  };

  constructor(private http: HttpClient) { 

  }
  

  signin() {
    this.http.get('http://localhost:3000/')
    .subscribe(data => {
      console.log(data);
    });
  }

  signup(input) {
    return this.http.post('http://localhost:3000/api/users',input, this.httpOptions)

  }
}
