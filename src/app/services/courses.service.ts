import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  courseserver = environment.backendhost + "/api/courses";



 constructor(private http: HttpClient) { 

}

getCourses() {
  let myToken = localStorage.getItem('token') || " ";

  let Options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' ,
      'x-auth-token' : myToken
    })
  };
   return this.http.get<any>(this.courseserver, Options)
}

getCourseId(id) {
  let myToken = localStorage.getItem('token') || " ";

  let Options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' ,
      'x-auth-token' : myToken
    })
  };
   return this.http.get<any>(this.courseserver +'/' + id, Options)
}


saveCourse(post) {
  let myToken = localStorage.getItem('token') || " ";

  let Options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' ,
      'x-auth-token' : myToken
    })
  };
   return this.http.post<any>(this.courseserver, post, Options)
}
updateCourse(id,post) {
  let myToken = localStorage.getItem('token') || " ";

  let Options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' ,
      'x-auth-token' : myToken
    })
  };
   return this.http.put<any>(this.courseserver  +'/' + id, post, Options)
}
postTee(id,teeid,post) {
  let myToken = localStorage.getItem('token') || " ";

  let Options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' ,
      'x-auth-token' : myToken
    })
  };
   return this.http.put<any>(this.courseserver  +'/' + id +'/' + teeid, post, Options)
}


deleteCourse(id) {
  let myToken = localStorage.getItem('token') || " ";

  let Options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' ,
      'x-auth-token' : myToken
    })
  };
   return this.http.delete<any>(this.courseserver  +'/' + id, Options)
}

}
