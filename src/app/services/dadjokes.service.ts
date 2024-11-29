import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DadjokesService {

  constructor(private http: HttpClient) { 

  }
  API = 'https://icanhazdadjoke.com/';
  getJokes() {

    let headers:HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    
  
    let Options = {
      headers: new HttpHeaders({
        'Content-Type': 'text/html'
      }),
      
    };
     return this.http.get<any>(this.API ,{headers});
  }
}
