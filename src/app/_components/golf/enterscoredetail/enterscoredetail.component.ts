import { NewuserComponent } from './../../profile/newuser/newuser.component';
import { Component, Input , OnChanges} from '@angular/core';
import { UntypedFormControl,FormControl, UntypedFormGroup, Validators } from '@angular/forms';

import { ScoreService } from '../../../services/score.service';
import { LoginService } from 'src/app/services/login.service';
import { AlertService } from './../../../services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enterscoredetail',
  templateUrl: './enterscoredetail.component.html',
  styleUrls: ['./enterscoredetail.component.css']
})
export class EnterscoredetailComponent {

  numbers;
  shape;
  isfairway = true;
  scoreUser;
  username;
  bgcolor="white";
  resubmit=false;

  roundsplayed;
  currenthandicap;
  calculated = false;
  detail="3";


 // shape = ["","","","","","","","","","","","","","","","","",""];


  form;
  parArray :number[]=[];
  scoreArray :number[]=[];
  fairwaysArray:string[]=[];
  greensArray :string[]=[];
  puttsArray :number[]=[];
  penaltyArray :number[]=[];
  handicapArray : number[]=[];
  scorediff:number;
  holes18:boolean;
  holesplayed;
  front9;
  back9;

  fullOptions = ["Y","L2","L1","R1","R2","S","W"];
  par3Options = ["--"];
  girOptions = ["Y","N"];
  taf = [1,2,3,4,5,6,7,8,9]
  tab = [10,11,12,13,14,15,16,17,18]
  

  @Input() courseTee;

  // constructor(private courses: CoursesService, private router: Router, private alert: AlertService) {}

  constructor(private score: ScoreService, private user: LoginService, private router: Router, private alert: AlertService) {
    this.numbers = Array.from({length: 18}, (_, i) => i + 1);
    this.shape = Array.from({length: 18}, (_, i) => "par");
   // console.log("shape " + this.shape);
    this.form = new UntypedFormGroup({
      courseid : new UntypedFormControl('', []),
      scoredetail : new UntypedFormControl('', []),
      teeid   : new UntypedFormControl('', []),
      name     : new UntypedFormControl('', []),
      coursename     : new UntypedFormControl('', []),
      teename    : new UntypedFormControl('', []),
      holes18    : new UntypedFormControl('', []),
      holesplayed : new UntypedFormControl('', []),
      username    : new UntypedFormControl('', []),
      partotalcourse : new UntypedFormControl('', []),
      slope	     : new UntypedFormControl('', []),
      rating     : new UntypedFormControl('', []),
      date       : new UntypedFormControl('', []),
      rn       : new UntypedFormControl('', []),
      year    : new UntypedFormControl('', []),
      f9tot   : new UntypedFormControl('', []),
      b9tot    : new UntypedFormControl('', []),
      gtotal     : new UntypedFormControl('', [Validators.min(50), Validators.max(499),Validators.pattern('^[0-9]*$')]),
      ntotal     : new UntypedFormControl('', [Validators.min(50), Validators.max(499),Validators.pattern('^[0-9]*$')]),
      g_topar    : new UntypedFormControl('', []),
      handicap    : new UntypedFormControl('', []),
      gir     : new UntypedFormControl('', []),
      fairways : new UntypedFormControl('', []),
      fy : new UntypedFormControl('', []),
      fl2 : new UntypedFormControl('', []),
      fl1 : new UntypedFormControl('', []),
      fr1 : new UntypedFormControl('', []),
      fr2 : new UntypedFormControl('', []),
      fw : new UntypedFormControl('', []),
      fs : new UntypedFormControl('', []),
      putts   : new UntypedFormControl('', []),
      zeroputts     : new UntypedFormControl('', []),
      oneputts    : new UntypedFormControl('', []),
      twoputts    : new UntypedFormControl('', []),
      threeputtsplus : new UntypedFormControl('', []),
      penaltytotal   : new UntypedFormControl('', []),
      albatotal     : new UntypedFormControl('', []),
      eagletotal   : new UntypedFormControl('', []),
      birdietotal    : new UntypedFormControl('', []),
      partotal     : new UntypedFormControl('', []),
      bogeytotal     : new UntypedFormControl('', []),
      doubletotal    : new UntypedFormControl('', []),
      tripleplustotal    : new UntypedFormControl('', []),
      comment     : new UntypedFormControl('',[]),
      s1: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      s2: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      s3: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      s4: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      s5: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      s6: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      s7: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      s8: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      s9: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      s10: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      s11: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      s12: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      s13: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      s14: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      s15: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      s16: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      s17: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      s18: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      f1: new UntypedFormControl('', [Validators.required]),
      f2: new UntypedFormControl('', [Validators.required]),
      f3: new UntypedFormControl('', [Validators.required]),
      f4: new UntypedFormControl('', [Validators.required]),
      f5: new UntypedFormControl('', [Validators.required]),
      f6: new UntypedFormControl('', [Validators.required]),
      f7: new UntypedFormControl('', [Validators.required]),
      f8: new UntypedFormControl('', [Validators.required]),
      f9: new UntypedFormControl('', [Validators.required]),
      f10: new UntypedFormControl('', [Validators.required]),
      f11: new UntypedFormControl('', [Validators.required]),
      f12: new UntypedFormControl('', [Validators.required]),
      f13: new UntypedFormControl('', [Validators.required]),
      f14: new UntypedFormControl('', [Validators.required]),
      f15: new UntypedFormControl('', [Validators.required]),
      f16: new UntypedFormControl('', [Validators.required]),
      f17: new UntypedFormControl('', [Validators.required]),
      f18: new UntypedFormControl('', [Validators.required]),
      g1: new UntypedFormControl('', [Validators.required]),
      g2: new UntypedFormControl('', [Validators.required]),
      g3: new UntypedFormControl('', [Validators.required]),
      g4: new UntypedFormControl('', [Validators.required]),
      g5: new UntypedFormControl('', [Validators.required]),
      g6: new UntypedFormControl('', [Validators.required]),
      g7: new UntypedFormControl('', [Validators.required]),
      g8: new UntypedFormControl('', [Validators.required]),
      g9: new UntypedFormControl('', [Validators.required]),
      g10: new UntypedFormControl('', [Validators.required]),
      g11: new UntypedFormControl('', [Validators.required]),
      g12: new UntypedFormControl('', [Validators.required]),
      g13: new UntypedFormControl('', [Validators.required]),
      g14: new UntypedFormControl('', [Validators.required]),
      g15: new UntypedFormControl('', [Validators.required]),
      g16: new UntypedFormControl('', [Validators.required]),
      g17: new UntypedFormControl('', [Validators.required]),
      g18: new UntypedFormControl('', [Validators.required]),
      p1: new UntypedFormControl('', [Validators.required, Validators.min(0), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      p2: new UntypedFormControl('', [Validators.required, Validators.min(0), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      p3: new UntypedFormControl('', [Validators.required, Validators.min(0), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      p4: new UntypedFormControl('', [Validators.required, Validators.min(0), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      p5: new UntypedFormControl('', [Validators.required, Validators.min(0), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      p6: new UntypedFormControl('', [Validators.required, Validators.min(0), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      p7: new UntypedFormControl('', [Validators.required, Validators.min(0), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      p8: new UntypedFormControl('', [Validators.required, Validators.min(0), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      p9: new UntypedFormControl('', [Validators.required, Validators.min(0), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      p10: new UntypedFormControl('', [Validators.required, Validators.min(0), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      p11: new UntypedFormControl('', [Validators.required, Validators.min(0), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      p12: new UntypedFormControl('', [Validators.required, Validators.min(0), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      p13: new UntypedFormControl('', [Validators.required, Validators.min(0), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      p14: new UntypedFormControl('', [Validators.required, Validators.min(0), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      p15: new UntypedFormControl('', [Validators.required, Validators.min(0), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      p16: new UntypedFormControl('', [Validators.required, Validators.min(0), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      p17: new UntypedFormControl('', [Validators.required, Validators.min(0), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      p18: new UntypedFormControl('', [Validators.required, Validators.min(0), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      pen1: new UntypedFormControl('', [Validators.required, Validators.min(0), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      pen2: new UntypedFormControl('', [Validators.required, Validators.min(0), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      pen3: new UntypedFormControl('', [Validators.required, Validators.min(0), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      pen4: new UntypedFormControl('', [Validators.required, Validators.min(0), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      pen5: new UntypedFormControl('', [Validators.required, Validators.min(0), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      pen6: new UntypedFormControl('', [Validators.required, Validators.min(0), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      pen7: new UntypedFormControl('', [Validators.required, Validators.min(0), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      pen8: new UntypedFormControl('', [Validators.required, Validators.min(0), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      pen9: new UntypedFormControl('', [Validators.required, Validators.min(0), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      pen10: new UntypedFormControl('', [Validators.required, Validators.min(0), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      pen11: new UntypedFormControl('', [Validators.required, Validators.min(0), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      pen12: new UntypedFormControl('', [Validators.required, Validators.min(0), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      pen13: new UntypedFormControl('', [Validators.required, Validators.min(0), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      pen14: new UntypedFormControl('', [Validators.required, Validators.min(0), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      pen15: new UntypedFormControl('', [Validators.required, Validators.min(0), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      pen16: new UntypedFormControl('', [Validators.required, Validators.min(0), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      pen17: new UntypedFormControl('', [Validators.required, Validators.min(0), Validators.max(99),Validators.pattern('^[0-9]*$')]),
      pen18: new UntypedFormControl('', [Validators.required, Validators.min(0), Validators.max(99),Validators.pattern('^[0-9]*$')])

    });
  }

  ngOnInit() {
    this.scoreUser = localStorage.getItem('userid');
 
    this.getScore(this.scoreUser);
    this.user.getProfile()
    .subscribe((profile)=>{
      this.username = profile.email;
     // this.form.patchValue({'name' : profile.name});
     // this.form.patchValue({'gender' : profile.gender})
    });
   //this.form.controls["s1"].disable();
 
  }


  ngOnChanges() {
    
    if(this.courseTee) {
    this.parArray=[this.courseTee.tee.p1,this.courseTee.tee.p2,this.courseTee.tee.p3,this.courseTee.tee.p4,this.courseTee.tee.p5,this.courseTee.tee.p6,
      this.courseTee.tee.p7,this.courseTee.tee.p8,this.courseTee.tee.p9,this.courseTee.tee.p10,this.courseTee.tee.p11,this.courseTee.tee.p12,this.courseTee.tee.p13,
      this.courseTee.tee.p14,this.courseTee.tee.p15,this.courseTee.tee.p16,this.courseTee.tee.p17,this.courseTee.tee.p18  ] ;

    this.handicapArray=[this.courseTee.tee.h1,this.courseTee.tee.h2,this.courseTee.tee.h3,this.courseTee.tee.h4,this.courseTee.tee.h5,this.courseTee.tee.h6,
      this.courseTee.tee.h7,this.courseTee.tee.h8,this.courseTee.tee.h9,this.courseTee.tee.h10,this.courseTee.tee.h11,this.courseTee.tee.h12,this.courseTee.tee.h13,
      this.courseTee.tee.h14,this.courseTee.tee.h15,this.courseTee.tee.h16,this.courseTee.tee.h17,this.courseTee.tee.h18  ] ;
   
    this.form.reset();
    this.calculated = false;
    
    this.detail="3";

    this.shape = Array.from({length: 18}, (_, i) => "par");
    this.holes18=this.courseTee.tee.holes18;
    this.front9 = this.courseTee.tee.front9p;
    this.back9 = this.courseTee.tee.back9p;

    if(this.holes18) {this.holesplayed="18"}
    else {this.holesplayed="f9"}
    this.initializeForm();
    this.setForm();
  }
  }

  initializeForm() {
    for(let i=0;i<this.numbers.length;i++) { 
      var x = "f"+(i+1);
      var p = "p"+(i+1);
      var pen = "pen"+(i+1);
      //console.log("value of x: " + x);
      if(this.parArray[i]== 3) {
        //console.log("initialize form. Detail level: " + this.detail + " holesplayed " + this.holesplayed );
        if(this.detail=="3" && this.holesplayed=="18") { 
          this.form.patchValue({[x]: "--" });

        }
        else if(this.detail=="3" && this.holesplayed=="f9") {
          if(i < 9 ) {
            this.form.patchValue({[x]: "--" });

          }
          else {
            this.form.patchValue({[x]: "" });

          }
      }
      else if(this.detail=="3" && this.holesplayed=="b9") {
        if(i >= 9 ) {this.form.patchValue({[x]: "--" });}
        else {this.form.patchValue({[x]: "" });}
      }
        //this.form.get([x]).disable();
       
      }
      if(this.detail=="3" && this.holesplayed=="18" ) {
      this.form.patchValue({[p]: 2 });
      this.form.patchValue({[pen]: 0 });
      }
      else if(this.detail=="3" && this.holesplayed=="f9") {
        if(i<9) {
          this.form.patchValue({[p]: 2 });
          this.form.patchValue({[pen]: 0 });
        }
        else {
          this.form.patchValue({[p]: null });
          this.form.patchValue({[pen]: null });
        }
      }
      else if(this.detail=="3" && this.holesplayed=="b9") {
        if(i>=9) {
          this.form.patchValue({[p]: 2 });
          this.form.patchValue({[pen]: 0 });
        }
        else {
          this.form.patchValue({[p]: null });
          this.form.patchValue({[pen]: null });
        }
      }
    }
  }

  getScore(x) {

    console.log("getting score user information for " + x);
    this.score.getScoreId(x)
      .subscribe((s) => {
        
        if(s.scores !="new") {
        this.roundsplayed = s.scores.scores.length;
        this.currenthandicap = s.scores.handicap;
        console.log("Current Handicap: " + this.currenthandicap + "     Rounds Played:  " + this.roundsplayed);
        } else {
          this.roundsplayed = 0;
          this.currenthandicap = 55;
        }

      });

  }

  get frm() {
   // console.log("is the form valid:  " + this.form.valid);
   if(this.detail=="3" || this.detail=="2") {
    
    return this.form.invalid;
   }
   if(this.detail=="1") {
    if(this.form.value.gtotal == null || this.form.value.ntotal == null ) {
      return true;
    }
    if(this.form.value.gtotal < this.form.value.ntotal) {
      return true;
    }
    return this.form.invalid;

   }
  }


// onSubmit does calculations...post function, posts to mongo

  onSubmit() {
   // this.form.value.ntotal = 0;
    this.form.value.handicap = 0;
    this.form.value.scoredetail = this.detail;
    this.form.value.username = this.username;
    this.form.value.courseid = this.courseTee.tee.courseid;
    this.form.value.teeid    = this.courseTee.tee._id;
    this.form.value.teename    = this.courseTee.tee.teebox;
    this.form.value.name = this.courseTee.name;
    this.form.value.coursename = this.courseTee.tee.coursename;
    this.form.value.partotalcourse = this.courseTee.tee.totalp;
    this.form.value.slope = this.courseTee.tee.slope;
    this.form.value.rating = this.courseTee.tee.rating;
    this.form.value.date = this.courseTee.date;
    this.form.value.rn =  Date.now();
    this.form.value.year = this.courseTee?.date.getFullYear();
    this.form.value.f9tot = 0;
    this.form.value.b9tot = 0;
    this.form.value.gir = 0;
    this.form.value.fy = 0;
    this.form.value.fl2 = 0;
    this.form.value.fl1 = 0;
    this.form.value.fr1 = 0;
    this.form.value.fr2 = 0;
    this.form.value.fw = 0;
    this.form.value.fs = 0;
    this.form.value.fairways = 0;
    this.form.value.putts = 0;
    this.form.value.penaltytotal =0;
    this.form.value.albatotal=0;
    this.form.value.eagletotal=0;
    this.form.value.birdietotal=0;
    this.form.value.partotal=0;
    this.form.value.bogeytotal=0;
    this.form.value.doubletotal=0;
    this.form.value.tripleplustotal=0;
    this.form.value.zeroputts = 0;
    this.form.value.oneputts = 0;
    this.form.value.twoputts = 0;
    this.form.value.threeputtsplus = 0;

  // if level 2 or 3
    this.scoreArray = [parseInt(this.form.value.s1),parseInt(this.form.value.s2),parseInt(this.form.value.s3),parseInt(this.form.value.s4),
      parseInt(this.form.value.s5),parseInt(this.form.value.s6),parseInt(this.form.value.s7),parseInt(this.form.value.s8),
      parseInt(this.form.value.s9),parseInt(this.form.value.s10),parseInt(this.form.value.s11),
      parseInt(this.form.value.s12),parseInt(this.form.value.s13),parseInt(this.form.value.s14),parseInt(this.form.value.s15),
      parseInt(this.form.value.s16),parseInt(this.form.value.s17),parseInt(this.form.value.s18)]; 
  // if level 3
    this.greensArray = [this.form.value.g1,this.form.value.g2,this.form.value.g3,this.form.value.g4,
      this.form.value.g5,this.form.value.g6,this.form.value.g7,this.form.value.g8,
      this.form.value.g9,this.form.value.g10,this.form.value.g11,
      this.form.value.g12,this.form.value.g13,this.form.value.g14,this.form.value.g15,
      this.form.value.g16,this.form.value.g17,this.form.value.g18];  
      // if level 3  
    this.puttsArray = [parseInt(this.form.value.p1),parseInt(this.form.value.p2),parseInt(this.form.value.p3),parseInt(this.form.value.p4),
      parseInt(this.form.value.p5),parseInt(this.form.value.p6),parseInt(this.form.value.p7),parseInt(this.form.value.p8),
      parseInt(this.form.value.p9),parseInt(this.form.value.p10),parseInt(this.form.value.p11),
      parseInt(this.form.value.p12),parseInt(this.form.value.p13),parseInt(this.form.value.p14),parseInt(this.form.value.p15),
      parseInt(this.form.value.p16),parseInt(this.form.value.p17),parseInt(this.form.value.p18)];  
  // if level 3
    this.penaltyArray = [parseInt(this.form.value.pen1),parseInt(this.form.value.pen2),parseInt(this.form.value.pen3),parseInt(this.form.value.pen4),
      parseInt(this.form.value.pen5),parseInt(this.form.value.pen6),parseInt(this.form.value.pen7),parseInt(this.form.value.pen8),
      parseInt(this.form.value.pen9),parseInt(this.form.value.pen10),parseInt(this.form.value.pen11),
      parseInt(this.form.value.pen12),parseInt(this.form.value.pen13),parseInt(this.form.value.pen14),parseInt(this.form.value.pen15),
      parseInt(this.form.value.pen16),parseInt(this.form.value.pen17),parseInt(this.form.value.pen18)];
  // if level 3
    this.fairwaysArray = [this.form.value.f1,this.form.value.f2,this.form.value.f3,this.form.value.f4,
      this.form.value.f5,this.form.value.f6,this.form.value.f7,this.form.value.f8,
      this.form.value.f9,this.form.value.f10,this.form.value.f11,
      this.form.value.f12,this.form.value.f13,this.form.value.f14,this.form.value.f15,
      this.form.value.f16,this.form.value.f17,this.form.value.f18];
  // if level 2 or 3
    for(var i=0;i<18;i++) {
      if(this.detail !="1") {
      if(i < 9 && (this.holesplayed=="f9" || this.holesplayed=="18" )) {
        this.form.value.f9tot += this.scoreArray[i];
      }
      if(i >= 9 && (this.holesplayed=="b9" || this.holesplayed=="18" )) {
        this.form.value.b9tot += this.scoreArray[i];
      }
    }
      // if level 3. wrap the rest of for loop into a level 3 if
      if(this.greensArray[i]=='Y') {this.form.value.gir ++}
      if(this.fairwaysArray[i]=='Y') {
        this.form.value.fy ++;
        this.form.value.fairways++;
      }
      if(this.fairwaysArray[i]=='L2') {
        this.form.value.fl2 ++;
        this.form.value.fairways++;
      }
      if(this.fairwaysArray[i]=='L1') {
        this.form.value.fl1 ++;
        this.form.value.fairways++;
      }
      if(this.fairwaysArray[i]=='R1') {
        this.form.value.fr1 ++;
        this.form.value.fairways++;
      }
      if(this.fairwaysArray[i]=='R2') {
        this.form.value.fr2 ++;
        this.form.value.fairways++;
      }
      if(this.fairwaysArray[i]=='W') {
        this.form.value.fw ++;
        this.form.value.fairways++;
      }
      if(this.fairwaysArray[i]=='S') {
        this.form.value.fs ++;
        this.form.value.fairways++;
      }

    if(i < 9 && (this.holesplayed=="f9" || this.holesplayed=="18" )) {
      this.form.value.penaltytotal += this.penaltyArray[i];
      this.form.value.putts += this.puttsArray[i];
    }
    if(i >= 9 && (this.holesplayed=="b9" || this.holesplayed=="18" )) {
      this.form.value.penaltytotal += this.penaltyArray[i];
      this.form.value.putts += this.puttsArray[i];
    }

    if(i < 9 && (this.holesplayed=="f9" || this.holesplayed=="18" )) {
      switch (this.puttsArray[i]) {
        case 0:
          this.form.value.zeroputts++;
          break;
        case 1:
          this.form.value.oneputts++;
          break;
        case 2:
          this.form.value.twoputts++;
          break;
        default:
          this.form.value.threeputtsplus++;
      }
    }

    if(i >= 9 && (this.holesplayed=="b9" || this.holesplayed=="18" )) {
      switch (this.puttsArray[i]) {
        case 0:
          this.form.value.zeroputts++;
          break;
        case 1:
          this.form.value.oneputts++;
          break;
        case 2:
          this.form.value.twoputts++;
          break;
        default:
          this.form.value.threeputtsplus++;
      }
    }
    if(i < 9 && (this.holesplayed=="f9" || this.holesplayed=="18" )) {
      this.scorediff =this.scoreArray[i] - this.parArray[i];
    }
    if(i >= 9 && (this.holesplayed=="b9" || this.holesplayed=="18" )) {
      this.scorediff =this.scoreArray[i] - this.parArray[i];
    }
    if(i < 9 && (this.holesplayed=="f9" || this.holesplayed=="18" )) {
      switch(this.scorediff) {
        case -3:
          this.form.value.albatotal++;
          break;
        case -2: 
          this.form.value.eagletotal++;
          break;
        case -1:
          this.form.value.birdietotal++;
          break;
        case 0: 
          this.form.value.partotal++;
          break;
        case 1:
          this.form.value.bogeytotal++;
          break;
        case 2:
          this.form.value.doubletotal++;
          break;
        default:
          this.form.value.tripleplustotal++;
      }
    }
    if(i >= 9 && (this.holesplayed=="b9" || this.holesplayed=="18" )) {
      switch(this.scorediff) {
        case -3:
          this.form.value.albatotal++;
          break;
        case -2: 
          this.form.value.eagletotal++;
          break;
        case -1:
          this.form.value.birdietotal++;
          break;
        case 0: 
          this.form.value.partotal++;
          break;
        case 1:
          this.form.value.bogeytotal++;
          break;
        case 2:
          this.form.value.doubletotal++;
          break;
        default:
          this.form.value.tripleplustotal++;
      }
    }
    }  

    // end of 18 hole loop
    //if level 2 or 3
    if(this.detail !="1") {
      if(this.holesplayed=="18" ) {
        this.form.value.gtotal= this.form.value.f9tot + this.form.value.b9tot;
      }
      else if(this.holesplayed=="f9") {
        this.form.value.gtotal= this.form.value.f9tot;
      }
      else if(this.holesplayed=="b9") {
        this.form.value.gtotal= this.form.value.b9tot;
      }
  }
   //  need 3 ifs' one as is for 18 holes, 2 for summing up either the f9 or b9.  then compare to totalp
   // when choosing 9 holes on 18 hole course, class calc failing [circle, dblcircle etc] on null values
   if(this.holesplayed=="18") {this.form.value.g_topar = this.form.value.gtotal - this.courseTee.tee.totalp;}
   else if(this.holesplayed=="f9") {this.form.value.g_topar = this.form.value.gtotal - this.front9;}
   else if(this.holesplayed=="b9") {this.form.value.g_topar = this.form.value.gtotal - this.back9;}

    // do netscore calc and handicap calc here
    // level 2 and 3
    this.calcNetScore();
    // all levels
    this.calcHandicap();
    this.calculated = true;
    this.resubmit=false;

  }


  post() {
       // add below to final submit function
   
     this.score.postScore(this.scoreUser,this.form.value)
     .subscribe((ret)=>{
       this.alert.success(ret.message);
       this.resubmit=true;
       this.form.reset();
    
       this.shape = Array.from({length: 18}, (_, i) => "par");
       

     },(error)=> {
      this.alert.error(error.error.message);
     });

  }
  calcNetScore() {
   // console.log("net score: " + this.form.value.ntotal);
    let net = 0;
    let ch = this.currenthandicap;
    console.log("current handicap " + ch);
    let all;
    let rem;
    if(ch) {
      all = Math.trunc(this.currenthandicap / 18);
      rem = this.currenthandicap - (all * 18);
     // console.log("All " + all + " Rem " + rem);
    }  
    this.shape = [];
    let scoremax=0; 

//  set unplayed holes to "par"
    for(let i=0;i<18;i++) {
      const noH = 5;
      let cp = this.parArray[i];
      let hh = this.handicapArray[i];
      let sc = this.scoreArray[i];

      if      ((sc - cp) <= -2  ) {this.shape.push("dblcircle")}
      else if ((sc - cp) == -1  ) {this.shape.push("circle")}
      else if ((sc - cp) == 0  ) {this.shape.push("par")}
      else if ((sc - cp) == 1  ) {this.shape.push("square")}
      else if ((sc - cp) >= 2  ) {this.shape.push("dblsquare")}
      else {this.shape.push("par")}

    // narrow down to only played holes.  if 9 holes run through and add par up   
    if(sc > 0) {
    if(ch  ) {
      var xx;
      xx = (rem > hh) ? 1 : 0;
      scoremax = cp + all + xx + 2; 
    //   //   // console.log("hole " +i+ " score max "+scoremax+" score " + sc + " par " + cp + "all " + all + " to h " +  xx);
    } else {
      scoremax = cp + noH;
    }
    if(scoremax < sc) {net += scoremax}
    else {net+=sc}
      
    }
    // console.log("current Handicap: " + ch); 
    // console.log("net score: " + net);
  }
    if(this.detail !="1") {
     
      this.form.value.ntotal = net;
    }
  
  }

  calcHandicap() {
    const x = 113;  // static number used 
    if(this.holesplayed=="18"){
     let a = x / this.form.value.slope;
     let b = this.form.value.ntotal - this.form.value.rating;
    // if(b < 0) {b = Math.round(b * 10) / 10;}
     b = Math.round(b * 10) / 10;
     this.form.value.handicap = b * a;
    } else {
        let scoring_slope;
        let scoring_rating;
        let scoring_par;
        let second_slope;
        let second_rating;
        let second_par;
      //  let course_handicap;
     
        if(this.holesplayed=="f9" && this.holes18 ) {
          scoring_slope = this.courseTee.tee.f9slope;
          scoring_rating = this.courseTee.tee.f9rating;
          scoring_par = this.courseTee.tee.front9p;
          second_slope = this.courseTee.tee.b9slope;
          second_rating = this.courseTee.tee.b9rating;
          second_par = this.courseTee.tee.back9p;
          console.log(scoring_slope + "  " + scoring_rating + "  "+ scoring_par + "  "+ second_slope + "  "+ second_rating + "  "+ second_par);

        } else if(this.holesplayed=="b9") {
          scoring_slope = this.courseTee.tee.b9slope;
          scoring_rating = this.courseTee.tee.b9rating;
          scoring_par = this.courseTee.tee.back9p;
          second_slope = this.courseTee.tee.f9slope;
          second_rating = this.courseTee.tee.f9rating;
          second_par = this.courseTee.tee.front9p;
         console.log(scoring_par + "  " + scoring_rating + " " + scoring_slope );


        } else if (this.holesplayed=="f9" && !this.holes18) {
          scoring_slope = this.courseTee.tee.f9slope;
          scoring_rating = this.courseTee.tee.f9rating;
          scoring_par = this.courseTee.tee.front9p;
          second_slope = this.courseTee.tee.f9slope;
          second_rating = this.courseTee.tee.f9rating;
          second_par = this.courseTee.tee.front9p;


        } 
        

        // The formula is as follows:
        // Hardest thing to find on the web.  How to calculate "expected score". Best explanation below
        // 18-hole Score Differential = ((Adjusted Gross Score – 9-hole Course Rating) × 113 / 9-hole Slope Rating) 
        //                            + ((2nd Nine Par + Player’s 2nd Nine CH Strokes + 1) – 2nd Nine Course Rating)
        // assuming 2nd nine is the 9 not played on an 18 hole course.  If course is 9 holes only, will use the one
        // nine for both 9's

        if(this.roundsplayed==0){
          let first = (113 / scoring_slope) * (this.form.value.ntotal - scoring_rating);
          let a = x / scoring_slope;
          let b = this.form.value.ntotal - scoring_rating;
          this.form.value.handicap = first * 2;
          console.log("hdcp first: " + first) ;

        } else {

        let course_handicap = (scoring_slope / 113 * (.5 * this.currenthandicap)) + (scoring_rating - scoring_par) ;
        let second = ((second_par + course_handicap + 1) - second_rating);
        let first = (113 / scoring_slope) * (this.form.value.ntotal - scoring_rating);
        console.log("hdcp first: " + first +" second"+ second) ;
        //console.log("par:   " + scoring_par  + "  scoring rating " + scoring_rating  );
        

       // console.log("calculated course_handicap:   " + course_handicap);
       // console.log("Calculated Score Differential: " + sd);
        let a = x / scoring_slope;
        let b = this.form.value.ntotal - scoring_rating;
        this.form.value.handicap = first + second;
        console.log("calculated handicap Index: " + this.form.value.handicap);
        }
       
    }
   // console.log("handicap calculated: " + this.form.value.handicap);
  }

  setForm() {
    let scores =   ["s1","s2","s3","s4","s5","s6","s7","s8","s9",
                   "s10","s11","s12","s13","s14","s15","s16","s17","s18"];
    let fairways = ["f1","f2","f3","f4","f5","f6","f7","f8","f9",
                   "f10","f11","f12","f13","f14","f15","f16","f17","f18"];
    let greens =   ["g1","g2","g3","g4","g5","g6","g7","g8","g9",
                   "g10","g11","g12","g13","g14","g15","g16","g17","g18"];
    let pens =     ["pen1","pen2","pen3","pen4","pen5","pen6","pen7","pen8","pen9",
                   "pen10","pen11","pen12","pen13","pen14","pen15","pen16","pen17","pen18"];
    let putts =     ["p1","p2","p3","p4","p5","p6","p7","p8","p9",
                   "p10","p11","p12","p13","p14","p15","p16","p17","p18"];   

    this.form.reset();
    for(let i=0;i< 18;i++) { 
      // var x = "f"+(i+1);
      // var g = "g"+(i+1);
      // var p = "p"+(i+1);
      // var pen = "pen"+(i+1);
      // var s = "s"+(i+1);

    if(this.detail=="3" &&  this.holesplayed=="18") {
     // console.log("detail 3, 18 hole course and 18 holes chosen ");
      this.form.controls[scores[i]].enable();
      this.form.get(scores[i]).addValidators(Validators.required);
      this.form.get(scores[i]).updateValueAndValidity();
      this.form.controls[fairways[i]].enable();
      this.form.get(fairways[i]).addValidators(Validators.required);
      this.form.get(fairways[i]).updateValueAndValidity();
      this.form.controls[greens[i]].enable();
      this.form.get(greens[i]).addValidators(Validators.required);
      this.form.get(greens[i]).updateValueAndValidity();
      this.form.controls[pens[i]].enable();
      this.form.get(pens[i]).addValidators(Validators.required);
      this.form.get(pens[i]).updateValueAndValidity();
      this.form.controls[putts[i]].enable();
      this.form.get(putts[i]).addValidators(Validators.required);
      this.form.get(putts[i]).updateValueAndValidity();

    }
    else if(this.detail=="3"  && this.holesplayed!="18") {
      // console.log("detail 3, 18 hole course and 18 holes chosen ");
      if(this.holesplayed=="f9" && i < 9) {
       // console.log("first if, less than 9 and f9");
       this.form.controls[scores[i]].enable();
       this.form.get(scores[i]).addValidators(Validators.required);
       this.form.get(scores[i]).updateValueAndValidity();
       this.form.controls[fairways[i]].enable();
       this.form.get(fairways[i]).addValidators(Validators.required);
       this.form.get(fairways[i]).updateValueAndValidity();
       this.form.controls[greens[i]].enable();
       this.form.get(greens[i]).addValidators(Validators.required);
       this.form.get(greens[i]).updateValueAndValidity();
       this.form.controls[pens[i]].enable();
       this.form.get(pens[i]).addValidators(Validators.required);
       this.form.get(pens[i]).updateValueAndValidity();
       this.form.controls[putts[i]].enable();
       this.form.get(putts[i]).addValidators(Validators.required);
       this.form.get(putts[i]).updateValueAndValidity();
      }
      if(this.holesplayed=="f9" && i >= 9) {
        this.form.controls[scores[i]].disable();
        this.form.get(scores[i]).removeValidators(Validators.required);
        this.form.get(scores[i]).updateValueAndValidity();
        this.form.controls[fairways[i]].disable();
        this.form.get(fairways[i]).removeValidators(Validators.required);
        this.form.get(fairways[i]).updateValueAndValidity();
        this.form.controls[greens[i]].disable();
        this.form.get(greens[i]).removeValidators(Validators.required);
        this.form.get(greens[i]).updateValueAndValidity();
        this.form.controls[pens[i]].disable();
        this.form.get(pens[i]).removeValidators(Validators.required);
        this.form.get(pens[i]).updateValueAndValidity();
        this.form.controls[putts[i]].disable();
        this.form.get(putts[i]).removeValidators(Validators.required);
        this.form.get(putts[i]).updateValueAndValidity();
       }
       if((this.holesplayed=="b9" && i >= 9)) {
        console.log("first if, greater than 9 and b9");
        this.form.controls[scores[i]].enable();
        this.form.get(scores[i]).addValidators(Validators.required);
        this.form.get(scores[i]).updateValueAndValidity();
        this.form.controls[fairways[i]].enable();
        this.form.get(fairways[i]).addValidators(Validators.required);
        this.form.get(fairways[i]).updateValueAndValidity();
        this.form.controls[greens[i]].enable();
        this.form.get(greens[i]).addValidators(Validators.required);
        this.form.get(greens[i]).updateValueAndValidity();
        this.form.controls[pens[i]].enable();
        this.form.get(pens[i]).addValidators(Validators.required);
        this.form.get(pens[i]).updateValueAndValidity();
        this.form.controls[putts[i]].enable();
        this.form.get(putts[i]).addValidators(Validators.required);
        this.form.get(putts[i]).updateValueAndValidity();
       }
       if(this.holesplayed=="b9" && i < 9) {
         this.form.controls[scores[i]].disable();
         this.form.get(scores[i]).removeValidators(Validators.required);
         this.form.get(scores[i]).updateValueAndValidity();
         this.form.controls[fairways[i]].disable();
         this.form.get(fairways[i]).removeValidators(Validators.required);
         this.form.get(fairways[i]).updateValueAndValidity();
         this.form.controls[greens[i]].disable();
         this.form.get(greens[i]).removeValidators(Validators.required);
         this.form.get(greens[i]).updateValueAndValidity();
         this.form.controls[pens[i]].disable();
         this.form.get(pens[i]).removeValidators(Validators.required);
         this.form.get(pens[i]).updateValueAndValidity();
         this.form.controls[putts[i]].disable();
         this.form.get(putts[i]).removeValidators(Validators.required);
         this.form.get(putts[i]).updateValueAndValidity();
        }
 
     }
    else if(this.detail=="2" &&  this.holesplayed=="18") {
      this.form.controls[scores[i]].enable();
      this.form.get(scores[i]).addValidators(Validators.required);
      this.form.get(scores[i]).updateValueAndValidity();
     // this.form.controls[fairways[i]].enable();
      this.form.get(fairways[i]).removeValidators(Validators.required);
      this.form.get(fairways[i]).updateValueAndValidity();
     // this.form.controls[greens[i]].enable();
      this.form.get(greens[i]).removeValidators(Validators.required);
      this.form.get(greens[i]).updateValueAndValidity();
     // this.form.controls[pens[i]].enable();
      this.form.get(pens[i]).removeValidators(Validators.required);
      this.form.get(pens[i]).updateValueAndValidity();
    // this.form.controls[putts[i]].enable();
      this.form.get(putts[i]).removeValidators(Validators.required);
      this.form.get(putts[i]).updateValueAndValidity();

    }
    else if(this.detail=="2" &&  this.holesplayed!="18") {
      // console.log("detail 3, 18 hole course and 18 holes chosen ");
      if(this.holesplayed=="f9" && i < 9) {
        console.log("first if, less than 9 and f9");
       this.form.controls[scores[i]].enable();
       this.form.get(scores[i]).addValidators(Validators.required);
       this.form.get(scores[i]).updateValueAndValidity();
   //    this.form.controls[fairways[i]].enable();
       this.form.get(fairways[i]).removeValidators(Validators.required);
       this.form.get(fairways[i]).updateValueAndValidity();
   //    this.form.controls[greens[i]].enable();
       this.form.get(greens[i]).removeValidators(Validators.required);
       this.form.get(greens[i]).updateValueAndValidity();
   //    this.form.controls[pens[i]].enable();
       this.form.get(pens[i]).removeValidators(Validators.required);
       this.form.get(pens[i]).updateValueAndValidity();
   //    this.form.controls[putts[i]].enable();
       this.form.get(putts[i]).removeValidators(Validators.required);
       this.form.get(putts[i]).updateValueAndValidity();
      }
      if(this.holesplayed=="f9" && i >= 9) {
        this.form.controls[scores[i]].disable();
        this.form.get(scores[i]).removeValidators(Validators.required);
        this.form.get(scores[i]).updateValueAndValidity();
    //    this.form.controls[fairways[i]].disable();
        this.form.get(fairways[i]).removeValidators(Validators.required);
        this.form.get(fairways[i]).updateValueAndValidity();
     //   this.form.controls[greens[i]].disable();
        this.form.get(greens[i]).removeValidators(Validators.required);
        this.form.get(greens[i]).updateValueAndValidity();
   //     this.form.controls[pens[i]].disable();
        this.form.get(pens[i]).removeValidators(Validators.required);
        this.form.get(pens[i]).updateValueAndValidity();
    //    this.form.controls[putts[i]].disable();
        this.form.get(putts[i]).removeValidators(Validators.required);
        this.form.get(putts[i]).updateValueAndValidity();
       }
       if((this.holesplayed=="b9" && i >= 9)) {
        this.form.controls[scores[i]].enable();
        this.form.get(scores[i]).addValidators(Validators.required);
        this.form.get(scores[i]).updateValueAndValidity();
      //  this.form.controls[fairways[i]].enable();
        this.form.get(fairways[i]).removeValidators(Validators.required);
        this.form.get(fairways[i]).updateValueAndValidity();
      //  this.form.controls[greens[i]].enable();
        this.form.get(greens[i]).removeValidators(Validators.required);
        this.form.get(greens[i]).updateValueAndValidity();
      //  this.form.controls[pens[i]].enable();
        this.form.get(pens[i]).removeValidators(Validators.required);
        this.form.get(pens[i]).updateValueAndValidity();
     //   this.form.controls[putts[i]].enable();
        this.form.get(putts[i]).removeValidators(Validators.required);
        this.form.get(putts[i]).updateValueAndValidity();
       }
       if(this.holesplayed=="b9" && i < 9) {
         this.form.controls[scores[i]].disable();
         this.form.get(scores[i]).removeValidators(Validators.required);
         this.form.get(scores[i]).updateValueAndValidity();
      //   this.form.controls[fairways[i]].disable();
         this.form.get(fairways[i]).removeValidators(Validators.required);
         this.form.get(fairways[i]).updateValueAndValidity();
     //    this.form.controls[greens[i]].disable();
         this.form.get(greens[i]).removeValidators(Validators.required);
         this.form.get(greens[i]).updateValueAndValidity();
      //   this.form.controls[pens[i]].disable();
         this.form.get(pens[i]).removeValidators(Validators.required);
         this.form.get(pens[i]).updateValueAndValidity();
     //    this.form.controls[putts[i]].disable();
         this.form.get(putts[i]).removeValidators(Validators.required);
         this.form.get(putts[i]).updateValueAndValidity();
        }
 
     }
     else if(this.detail=="1") { 
     // this.form.controls[scores[i]].enable();
      this.form.get(scores[i]).removeValidators(Validators.required);
      this.form.get(scores[i]).updateValueAndValidity();
     // this.form.controls[fairways[i]].enable();
      this.form.get(fairways[i]).removeValidators(Validators.required);
      this.form.get(fairways[i]).updateValueAndValidity();
     //this.form.controls[greens[i]].enable();
      this.form.get(greens[i]).removeValidators(Validators.required);
      this.form.get(greens[i]).updateValueAndValidity();
    //  this.form.controls[pens[i]].enable();
      this.form.get(pens[i]).removeValidators(Validators.required);
      this.form.get(pens[i]).updateValueAndValidity();
    //  this.form.controls[putts[i]].enable();
      this.form.get(putts[i]).removeValidators(Validators.required);
      this.form.get(putts[i]).updateValueAndValidity();
     }

  }
  this.form.value.gtotal = null;
  this.form.value.ntotal = null;
  if(this.detail == "3") this.initializeForm();


  //   let items = ["p10","p11","p12","p13","p14","p15","p16","p17","p18",
  //   "yd10","yd11","yd12","yd13","yd14","yd15","yd16","yd17","yd18",
  //   "h10","h11","h12","h13","h14","h15","h16","h17","h18"
  //  ]


//     this.form.get(items[i]).removeValidators(Validators.required);
//     this.form.get(items[i]).updateValueAndValidity();
//   }
// }
// else {
//   for(let i=0;i<items.length;i++) {
//     this.form.get(items[i]).addValidators(Validators.required);
//     this.form.get(items[i]).updateValueAndValidity();


    //   //console.log("value of x: " + x);
    //   if(this.detail == "1") {
    // //    console.log("attempting to patch " + x);
    //     this.form.patchValue({[s]: "99" });
    //     //this.form.get([x]).disable();
       
    //   }
    //   this.form.patchValue({[x]: "na" });
    //   this.form.patchValue({[p]: 99 });
    //   this.form.patchValue({[pen]: 99 });
    //   this.form.patchValue({[g]: "na" });


  }


  detailLevel(event) {
    this.detail = event.value;
    this.calculated = false;
    console.log("Detail level: " + this.detail);
    this.shape = Array.from({length: 18}, (_, i) => "par");
    this.setForm();
    
    if(this.detail == "1" || this.detail == "2") {    this.setForm();}
    if(this.detail == "3" )  {this.initializeForm();}
  } 

  holesLevel(event) {
    this.holesplayed = event.value;
    this.form.value.holesplayed = this.holesplayed;
    this.calculated = false;
    this.shape = Array.from({length: 18}, (_, i) => "par");
    console.log(this.holesplayed);
    this.setForm();
  }
  

}
