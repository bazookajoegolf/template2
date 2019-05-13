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
  constructor() { }

  ngOnInit() {
  }

}
