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
  @Input() active;
  @Input() default;
  @Input() tabnum;

  
  w;
  chart:any;

  ngOnInit() {
    this.w = ((this.width / 2) * .78);
   
  }

  ngOnChanges(changes: SimpleChanges): void { 
   
    if(changes.data1?.currentValue && this.active==this.tabnum ) {
      google.charts.setOnLoadCallback(this.drawAnnotations(changes.data1.currentValue));
    }
    // else if(changes.data1?.currentValue && this.default ) {
    //   google.charts.setOnLoadCallback(this.drawAnnotations(changes.data1.currentValue));
    // }
    if((changes.active?.currentValue == this.tabnum )&& this.data1 ) {

       google.charts.setOnLoadCallback(this.drawAnnotations(this.data1));
   
       }

   }



   drawAnnotations(x) {
 
 //   console.log(JSON.stringify(x)); 

    if(x.length > 0 ) {
     // console.log(this.id);
       var data = google.visualization.arrayToDataTable(x);
       var options = {
        showRowNumber: true,
        width:'90%'
        
       
        }
        var table = new google.visualization.Table(document.getElementById(this.id));
        table.draw(data, options);

       };
      
    }


  }



