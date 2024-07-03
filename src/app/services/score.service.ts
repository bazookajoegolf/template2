import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {


  scoreserver = environment.backendhost + "/api/scores";

  constructor(private http: HttpClient) { 

  }


  getScoreId(id) {
    let myToken = localStorage.getItem('token');
  
    let Options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' ,
        'x-auth-token' : myToken
      })
    };
     return this.http.get<any>(this.scoreserver +'/' + id, Options)
  }

  getScoreIdYr(id, yr) {
    let myToken = localStorage.getItem('token');
  
    let Options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' ,
        'x-auth-token' : myToken
      })
    };
     return this.http.get<any>(this.scoreserver +'/' + id +'/' + yr, Options)
  }

  postScore(id,post) {
    let myToken = localStorage.getItem('token');
    console.log("in post score");
  
    let Options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' ,
        'x-auth-token' : myToken
      })
    };
     return this.http.post<any>(this.scoreserver +'/' + id, post, Options)
  }
}
