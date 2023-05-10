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
      fairwayshit   : new UntypedFormControl('', [Validators.required]),
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
   // console.log(JSON.stringify(this.courseTee));
  }

}
