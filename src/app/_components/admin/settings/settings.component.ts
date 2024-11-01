import { Component, OnInit } from '@angular/core';

import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SettingsService } from '../../../services/settings.service';
import { AlertService } from './../../../services/alert.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css','./../../../assets/css/bkgd.css']
})
export class SettingsComponent implements OnInit {
  id;
  form: UntypedFormGroup;
  //statusMessage = null;
  constructor(private settings: SettingsService, private router: Router, private alert: AlertService) { }

  ngOnInit(): void {
    this.form = new UntypedFormGroup({
      minpassword: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(15), Validators.pattern('^[0-9]*$')]),
      maxpassword: new UntypedFormControl('', [Validators.required, Validators.min(2), Validators.max(30), Validators.pattern('^[0-9]*$')]),
      minname:     new UntypedFormControl('', [Validators.required, Validators.min(3), Validators.max(50), Validators.pattern('^[0-9]*$')]),
      maxname:     new UntypedFormControl('', [Validators.required, Validators.min(4), Validators.max(50), Validators.pattern('^[0-9]*$')]),
      maxnotes:    new UntypedFormControl('', [Validators.required, Validators.min(50), Validators.max(2000), Validators.pattern('^[0-9]*$')]),
      newusertoken: new UntypedFormControl('',[Validators.required, Validators.min(1), Validators.max(24), Validators.pattern('^[0-9]*$')]),
      usertoken:   new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(48), Validators.pattern('^[0-9]*$')]),
      admintoken:  new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(48), Validators.pattern('^[0-9]*$')]),
      smtphost:    new UntypedFormControl('', [Validators.required]),
      smtpsendas:  new UntypedFormControl('', [Validators.required]),
      smtpsentto:  new UntypedFormControl('', [Validators.required])
    });

    this.settings.getSettings()
    .subscribe((settings)=>{
      if(settings) {
      this.form.patchValue({'minpassword' : settings.minpassword});
      this.form.patchValue({'maxpassword' : settings.maxpassword});
      this.form.patchValue({'minname'     : settings.minname});
      this.form.patchValue({'maxname'     : settings.maxname});
      this.form.patchValue({'maxnotes'    : settings.maxnotes});
      this.form.patchValue({'newusertoken' : settings.newusertoken});
      this.form.patchValue({'usertoken'   : settings.usertoken});
      this.form.patchValue({'admintoken'  : settings.admintoken});
      this.form.patchValue({'smtphost'    : settings.smtphost});
      this.form.patchValue({'smtpsendas'  : settings.smtpsendas});
      this.form.patchValue({'smtpsentto'  : settings.smtpsentto});
      this.id = settings._id;
      } 
    },(error) => {
       this.alert.error(error.error.message);
    });
  }

  get f() {
    return this.form.controls
  };

  onSubmit() {

    const post = {
      id: this.id,
      minpassword: this.form.value.minpassword,
      maxpassword: this.form.value.maxpassword,
      minname    : this.form.value.minname,
      maxname    : this.form.value.maxname, 
      maxnotes   : this.form.value.maxnotes,
      newusertoken: this.form.value.newusertoken,
      usertoken  : this.form.value.usertoken,
      admintoken : this.form.value.admintoken,
      smtphost   : this.form.value.smtphost,
      smtpsendas : this.form.value.smtpsendas,
      smtpsentto : this.form.value.smtpsentto 
    }
    console.log(post);
    this.settings.postSettings(post)
      .subscribe(response => {
        this.alert.success("Settings Saved!");
      },
        (error) => {
          this.alert.error(error.error.message);

        }
      );

  }


}
