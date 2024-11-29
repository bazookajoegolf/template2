import { Component, Input, SimpleChanges } from '@angular/core';
declare var google:any;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {

  constructor() {}


  @Input() data1;
  @Input() id;
  @Input() type;
  @Input() title;
  @Input() htitle;
  @Input() vtitle;
  @Input() color;
  @Input() width;
  
  w;
  chart:any;

  ngOnInit() {
    this.w = ((this.width / 2) * .78);
   
  }

  ngOnChanges(changes: SimpleChanges): void { 

    if(changes.data1?.currentValue ) {
    
   // google.charts.load('current', {'packages': ['table']});
    google.charts.setOnLoadCallback(this.drawAnnotations(changes.data1.currentValue));
    }
  
   }

   drawAnnotations(x) {
 
 //   console.log(JSON.stringify(x)); 
    if(x.length > 0) {
     // console.log(this.id);
       var data = google.visualization.arrayToDataTable(x);
       var options = {
        showRowNumber: true,
        width:this.w,
        height:225
       
        }
        var table = new google.visualization.Table(document.getElementById(this.id));
        table.draw(data, options);
       };

    }


  }



