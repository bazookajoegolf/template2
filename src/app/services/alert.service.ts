import { Router , NavigationStart} from '@angular/router';
import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {filter} from 'rxjs/operators';
import {Alert, AlertType, AlertOptions} from '../models/alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private subject = new Subject<Alert>();
  //private keepAfterRouteChange = false;
  private defaultId = 'default-alert';

  //private a=new Alert;

  // enable subscribing to alerts observable
  onAlert(id = this.defaultId): Observable<Alert> {
    return this.subject.asObservable().pipe(filter(x => x && x.id === id));
}

// convenience methods
success(message: string, options?: AlertOptions) {
    this.alert(new Alert({ ...options, type: AlertType.Success, autoClose:true, message }));
}

error(message: string, options?: AlertOptions) {
    this.alert(new Alert({ ...options, type: AlertType.Error,autoClose:true, message }));
}

info(message: string, options?: AlertOptions) {
    this.alert(new Alert({ ...options, type: AlertType.Info, autoClose:true, message }));
}

warn(message: string, options?: AlertOptions) {
    this.alert(new Alert({ ...options, type: AlertType.Warning, autoClose:true, message }));
}

// main alert method    
alert(alert: Alert) {
    alert.id = alert.id || this.defaultId;
    this.subject.next(alert);
}

// clear alerts
clear(id = this.defaultId) {
    this.subject.next(new Alert({ id }));
}
}
