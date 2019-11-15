import { SnackstatusComponent } from './../snackstatus/snackstatus.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertService } from './../../../services/alert.service';
import { Alert, AlertType } from './../../../models/alert';
import { Component, OnInit } from '@angular/core';
import {Status} from '../../../models/status';




@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  status:Status = {
    level : "primary",
    message : "All Okay"
    
  }; 

  alerts: Alert[];

  constructor(private alertService : AlertService, private snackBar : MatSnackBar) { }

  ngOnInit() {
    
    this.alertService.getAlert().subscribe((alert: Alert) =>{
      if(!alert) {
         this.alerts = [];
         return;
      }

      this.alerts.push(alert);
      if (alert.type==0) {
          this.snackBar.open(alert.message, 'Close',
           {duration: 2000,
            panelClass: 'snack-success'
          });
      } else if (alert.type==1){
        this.snackBar.open(alert.message, 'Close',
           {duration: 2000,
            panelClass: 'snack-error'
          });
      }
     
    });
  }

  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter( x => x !== alert);
  }

  cssClass(alert : Alert) {
    if (!alert) {return}

    switch(alert.type) {
      case AlertType.Success: return 'alert alert-success';
      case AlertType.Error: return 'alert alert-danger';
      case AlertType.Info: return 'alert alert-info';
      case AlertType.Warning: return 'alert alert-warning';

    }
  }

}
