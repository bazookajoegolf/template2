import { AlertService } from './../../../services/alert.service';
import { User } from '../../../models/user';
import { LoginService } from '../../../services/login.service';
import { CoursesService } from '../../../services/courses.service';

import { Component, OnInit, OnDestroy } from '@angular/core';
import {UntypedFormControl,UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';

import  countries from  "../../../assets/data/countrycodes.json";




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css','../../../assets/css/bkgd.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  form ;
  user :User;
 // statusMessage = null;
  editMode = false;
  id : string;
  exp : Date;
  courseList = [];
  country: string;
  countryList = [];

  
  constructor(private signup : LoginService , private courses : CoursesService , private router:Router, private alert : AlertService) { }

  ngOnInit() :void {  

    if(!localStorage.getItem('token')) { this.router.navigate(['login']); }
        
    this.form = new UntypedFormGroup({
      email : new UntypedFormControl('',[Validators.required, Validators.email]),
      name : new UntypedFormControl ('',[Validators.required, Validators.minLength(5),Validators.maxLength(15)]),
      gender : new UntypedFormControl ('',[Validators.required]),
      oldpassword: new UntypedFormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
      homeCourse : new UntypedFormControl ('',[]),
      birthdate : new UntypedFormControl ('',[]),
      nickname : new UntypedFormControl ('',[]),
      country : new UntypedFormControl ('',[])
    });
        
    this.getCourses();
    this.countryList = countries.countries;

    this.signup.getProfile()
    .subscribe((profile)=>{
      if(profile) {
      //console.log(profile.name);
      this.user = profile;
      //  this.user = profile.name;
      //  this.user.email = profile.email;
      //  this.user.password = profile.password;
      this.form.patchValue({'email' : profile.email});
      this.form.patchValue({'name' : profile.name});
      this.form.patchValue({'password' : "*****"});
      this.form.patchValue({'gender' : profile.gender});
      this.form.patchValue({'homeCourse' : profile.homeCourse});
      this.form.patchValue({'country' : profile.country});
      this.form.patchValue({'countryCode' : profile.countryCode});
      this.form.patchValue({'birthdate' : profile.birthdate});
      this.form.patchValue({'nickname' : profile.nickname});
      this.form.disable();
      this.id = profile._id;
      } 
     // this.alert.success("Success");
      
    },(error) => {
       this.alert.error(error.error.message);

       setTimeout(()=>{
         this.alert.clear();
         this.router.navigate(['login']);
    },2000);

    });

   // this.form.email.set
}

ngOnDestroy() : void {

}

get f() {
  return this.form.controls
  };

 
get p() {
  return this.user
}  
  
    onSubmit() {
      const cc = this.countryList.find(({name}) => name === this.form.value.country);
        const post = {
            name: this.form.value.name,
            email: this.form.value.email,
            oldpassword: this.form.value.oldpassword,
            homeCourse: this.form.value.homeCourse,
            gender : this.form.value.gender,
            birthdate: this.form.value.birthdate,
            nickname: this.form.value.nickname,
            country : this.form.value.country,
            countryCode : cc.code
        }
        
      
        //console.log("country code: " + this.countryList.find(this.form.value.country));

        this.signup.updateProfile(this.id, post)
            .pipe(
                tap(_ => console.log("tapping")) ,
                catchError( err => { throw err.error.message})
                         
            )
            .subscribe (
                response => {
                this.alert.success("Request Sent Successfully");
                 localStorage.setItem('token', response.token);
                 localStorage.setItem('homeCourse', response.user.homeCourse);
                 localStorage.setItem('gender', response.user.gender);
                 localStorage.setItem('email', response.user.email);
                 localStorage.setItem('birthdate', response.user.birthdate);
                 localStorage.setItem('nickname', response.user.nickname);
                 localStorage.setItem('country', response.user.country);
                 localStorage.setItem('countryCode', response.user.countryCode);
                // update the user object.
                setTimeout(() => {
                    this.router.navigate(['profile']);
                    this.form.patchValue({'email' : response.user.email});
                    this.form.patchValue({'name' : response.user.name});
                    this.editMode = false;
                    this.form.disable();
                    this.alert.clear();
                }, 2000);
            } ,
               err => this.alert.error(err) 
            );

    }


 cancelUpdate() {

  this.form.patchValue({'email' : this.user.email});
  this.form.patchValue({'name' : this.user.name});
  this.form.patchValue({'oldpassword' : "*****"});
  this.editMode = false;
  if(this.editMode) {this.form.enable()}
  else (this.form.disable())
  this.alert.clear();
}

 onUpdate() {
   this.editMode = true;
    this.form.patchValue({'oldpassword' : ""});
   if(this.editMode) {this.form.enable()}
   else {this.form.disable()}
   this.alert.clear();
 }
 onPasswordUpdate() {
    this.router.navigate(['changepassword']);

//  // this.editMode = !this.editMode;
//   this.passwordChange = true;
//   this.editMode = false;
//   if(this.passwordChange) {this.form.enable()}
//   else (this.form.disable())
//   this.statusMessage = null;
}

getCourses() {

  this.courses.getCourses()
    .subscribe((courses) => {
     
      this.courseList = courses;
      //console.table(this.courseList);
    });

}





}
