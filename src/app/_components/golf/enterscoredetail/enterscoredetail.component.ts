import { NewuserComponent } from './../../profile/newuser/newuser.component';
import { Component, Input , OnChanges} from '@angular/core';
import { UntypedFormControl,FormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-enterscoredetail',
  templateUrl: './enterscoredetail.component.html',
  styleUrls: ['./enterscoredetail.component.css']
})
export class EnterscoredetailComponent {

  numbers;
  bgcolor="white";
  form;
  parArray :number[]=[];
  scoreArray :number[]=[];
  fairwaysArray:string[]=[];
  greensArray :string[]=[];
  puttsArray :number[]=[];
  penaltyArray :number[]=[];
  

  @Input() courseTee;

  constructor() {
    this.numbers = Array.from({length: 18}, (_, i) => i + 1);

    this.form = new UntypedFormGroup({
      courseid : new UntypedFormControl('', [Validators.required]),
      teeid   : new UntypedFormControl('', [Validators.required]),
      userid   : new UntypedFormControl('', [Validators.required]),
      coursename     : new UntypedFormControl('', [Validators.required]),
      teename    : new UntypedFormControl('', [Validators.required]),
      username    : new UntypedFormControl('', [Validators.required]),
      partotalcourse : new UntypedFormControl('', [Validators.required]),
      slope	     : new UntypedFormControl('', [Validators.required]),
      rating     : new UntypedFormControl('', [Validators.required]),
      date       : new UntypedFormControl('', [Validators.required]),
      year    : new UntypedFormControl('', [Validators.required]),
      f9tot   : new UntypedFormControl('', [Validators.required]),
      b9tot    : new UntypedFormControl('', [Validators.required]),
      gtotal     : new UntypedFormControl('', [Validators.required]),
      ntotal     : new UntypedFormControl('', [Validators.required]),
      g_topar    : new UntypedFormControl('', [Validators.required]),
      handicap    : new UntypedFormControl('', [Validators.required]),
      gir     : new UntypedFormControl('', [Validators.required]),
      fairways : new UntypedFormControl('', [Validators.required]),
      fy : new UntypedFormControl('', [Validators.required]),
      fl2 : new UntypedFormControl('', [Validators.required]),
      fl1 : new UntypedFormControl('', [Validators.required]),
      fr1 : new UntypedFormControl('', [Validators.required]),
      fr2 : new UntypedFormControl('', [Validators.required]),
      fw : new UntypedFormControl('', [Validators.required]),
      fs : new UntypedFormControl('', [Validators.required]),
      putts   : new UntypedFormControl('', [Validators.required]),
      zeroputts     : new UntypedFormControl('', [Validators.required]),
      oneputts    : new UntypedFormControl('', [Validators.required]),
      twoputts    : new UntypedFormControl('', [Validators.required]),
      threeputtsplus : new UntypedFormControl('', [Validators.required]),
      Penaltytotal   : new UntypedFormControl('', [Validators.required]),
      albatotal     : new UntypedFormControl('', [Validators.required]),
      eagletotal   : new UntypedFormControl('', [Validators.required]),
      birdietotal    : new UntypedFormControl('', [Validators.required]),
      partotal     : new UntypedFormControl('', [Validators.required]),
      bogeytotal     : new UntypedFormControl('', [Validators.required]),
      doubletotal    : new UntypedFormControl('', [Validators.required]),
      tripleplustotal    : new UntypedFormControl('', [Validators.required]),
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

  ngOnChanges() {
    if(this.courseTee) {
    this.parArray=[this.courseTee.tee.p1,this.courseTee.tee.p2,this.courseTee.tee.p3,this.courseTee.tee.p4,this.courseTee.tee.p5,this.courseTee.tee.p6,
      this.courseTee.tee.p7,this.courseTee.tee.p8,this.courseTee.tee.p9,this.courseTee.tee.p10,this.courseTee.tee.p11,this.courseTee.tee.p12,this.courseTee.tee.p13,
      this.courseTee.tee.p14,this.courseTee.tee.p15,this.courseTee.tee.p16,this.courseTee.tee.p17,this.courseTee.tee.p18  ] ;

    // console.log(JSON.stringify(this.parArray));
    // console.log(this.courseTee.tee.p1);
    // console.log(JSON.stringify(this.courseTee));
  }
  }

  onSubmit() {
    this.form.courseid = this.courseTee.courseid;
    this.form.teeid    = this.courseTee._id;
    this.form.userid = localStorage.getItem('userid');
    this.form.coursename = this.courseTee.name;
    this.form.partotalcourse = this.courseTee.totalp;
    this.form.slope = this.courseTee.slope;
    this.form.rating = this.courseTee.rating;
    this.form.date = this.courseTee.date;
    this.form.year = this.courseTee?.date.getFullYear();
    this.form.gir = 0;
    this.form.fy = 0;
    this.form.fl2 = 0;
    this.form.fl1 = 0;
    this.form.fr1 = 0;
    this.form.fr2 = 0;
    this.form.fw = 0;
    this.form.fs = 0;
    this.form.fairways = 0;

    this.scoreArray = [parseInt(this.form.value.s1),parseInt(this.form.value.s2),parseInt(this.form.value.s3),parseInt(this.form.value.s4),
      parseInt(this.form.value.s5),parseInt(this.form.value.s6),parseInt(this.form.value.s7),parseInt(this.form.value.s8),
      parseInt(this.form.value.s9),parseInt(this.form.value.s10),parseInt(this.form.value.s11),
      parseInt(this.form.value.s12),parseInt(this.form.value.s13),parseInt(this.form.value.s14),parseInt(this.form.value.s15),
      parseInt(this.form.value.s16),parseInt(this.form.value.s17),parseInt(this.form.value.s18)]; 

    this.greensArray = [this.form.value.g1,this.form.value.g2,this.form.value.g3,this.form.value.g4,
      this.form.value.g5,this.form.value.g6,this.form.value.g7,this.form.value.g8,
      this.form.value.g9,this.form.value.g10,this.form.value.g11,
      this.form.value.g12,this.form.value.g13,this.form.value.g14,this.form.value.g15,
      this.form.value.g16,this.form.value.g17,this.form.value.g18];  
      
    this.puttsArray = [parseInt(this.form.value.p1),parseInt(this.form.value.p2),parseInt(this.form.value.p3),parseInt(this.form.value.p4),
      parseInt(this.form.value.p5),parseInt(this.form.value.p6),parseInt(this.form.value.p7),parseInt(this.form.value.p8),
      parseInt(this.form.value.p9),parseInt(this.form.value.p10),parseInt(this.form.value.p11),
      parseInt(this.form.value.p12),parseInt(this.form.value.p13),parseInt(this.form.value.p14),parseInt(this.form.value.p15),
      parseInt(this.form.value.p16),parseInt(this.form.value.p17),parseInt(this.form.value.p18)];  

    this.penaltyArray = [parseInt(this.form.value.pen1),parseInt(this.form.value.pen2),parseInt(this.form.value.pen3),parseInt(this.form.value.pen4),
      parseInt(this.form.value.pen5),parseInt(this.form.value.pen6),parseInt(this.form.value.pen7),parseInt(this.form.value.pen8),
      parseInt(this.form.value.pen9),parseInt(this.form.value.pen10),parseInt(this.form.value.pen11),
      parseInt(this.form.value.pen12),parseInt(this.form.value.pen13),parseInt(this.form.value.pen14),parseInt(this.form.value.pen15),
      parseInt(this.form.value.pen16),parseInt(this.form.value.pen17),parseInt(this.form.value.pen18)];

    this.fairwaysArray = [this.form.value.f1,this.form.value.f2,this.form.value.f3,this.form.value.f4,
      this.form.value.f5,this.form.value.f6,this.form.value.f7,this.form.value.f8,
      this.form.value.f9,this.form.value.f10,this.form.value.f11,
      this.form.value.f12,this.form.value.f13,this.form.value.f14,this.form.value.f15,
      this.form.value.f16,this.form.value.f17,this.form.value.f18];

    for(var i=0;i<18;i++) {
      if(i < 9) {
        this.form.f9tot += this.scoreArray[i];
      }
      if(i >= 9) {
        this.form.b9tot += this.scoreArray[i];
      }
      if(this.greensArray[i]=='y') {this.form.gir ++}
      if(this.fairwaysArray[i]=='y') {
        this.form.fy ++;
        this.form.fairways++;
      }
      if(this.fairwaysArray[i]=='l2') {
        this.form.fl2 ++;
        this.form.fairways++;
      }
      if(this.fairwaysArray[i]=='l1') {
        this.form.fl1 ++;
        this.form.fairways++;
      }
      if(this.fairwaysArray[i]=='r1') {
        this.form.fr1 ++;
        this.form.fairways++;
      }
      if(this.fairwaysArray[i]=='r2') {
        this.form.fr2 ++;
        this.form.fairways++;
      }
      if(this.fairwaysArray[i]=='w') {
        this.form.fw ++;
        this.form.fairways++;
      }
      if(this.fairwaysArray[i]=='s') {
        this.form.fs ++;
        this.form.fairways++;
      }

    }  
    // console.log(JSON.stringify(this.scoreArray));
    // console.log(JSON.stringify(this.greensArray));
    // console.log(JSON.stringify(this.puttsArray));
    // console.log(JSON.stringify(this.penaltyArray));
     console.log(JSON.stringify(this.form.value));


  }

}
