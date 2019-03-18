import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { 
    this.http.get('http://localhost:3000/')
    .subscribe(data => {
      console.log(data);
    });
  }
  

  signin() {
    this.http.get('http://localhost:3000/')
    .subscribe(data => {
      console.log(data);
    });
  }
}
