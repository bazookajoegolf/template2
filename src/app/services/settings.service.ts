import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {


    // hostserver= "http://"+ environment.backendhost;
    settingserver = environment.backendhost + "/api/setting"

    token = localStorage.getItem('token') || " ";
    
      httpOptions = {
       headers: new HttpHeaders({
         'Content-Type': 'application/json' ,
         'x-auth-token' : this.token
       })
     };
   
   
     constructor(private http: HttpClient) { 
       
     }

     getSettings() {
      let myToken = localStorage.getItem('token') || " ";
   
      let Options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json' ,
          'x-auth-token' : myToken
        })
      };
       return this.http.get<any>(this.settingserver, Options)
    }

     postSettings(post) {
      let myToken = localStorage.getItem('token') || " ";
   
      let Options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json' ,
          'x-auth-token' : myToken
        })
      };
       return this.http.post<any>(this.settingserver, post,  Options)
    }

}
