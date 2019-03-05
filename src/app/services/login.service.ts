import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
    http.get('http://localhost:3001/api/auth')
    .subscribe(data => {
      console.log(data);
    });
   }

  signin() {
    this.http.get('http://localhost:3001/api/auth')
    .subscribe(data => {
      console.log(data);
    });
  }
}
