import { Component, Input, SimpleChanges } from '@angular/core';
declare var google:any;

@Component({
  selector: 'app-line',
  standalone: false,
  templateUrl: './line.component.html',
  styleUrl: './line.component.css'
})
export class LineComponent {
  ticks=0;
  constructor() {}


  @Input() data1;
  @Input() id;
  @Input() type;
  @Input() title;
  @Input() htitle;
  @Input() vtitle;
  @Input() color;
  @Input() rounds;
  @Input() width;

 
  
  


  w;
  chart:any;

  ngOnInit() {

    
   
   
  }
  ngOnChanges(changes: SimpleChanges): void { 

    this.w = ((this.width / 2) * .8);

    if(changes.data1?.currentValue ) {
      
    this.ticks = Math.round(this.rounds / 5);
    //console.log(this.ticks);
   // google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(this.drawAnnotations(changes.data1.currentValue));
    }
  
   }

   drawAnnotations(x) {
 
 //   console.log(JSON.stringify(x)); 
    if(x.length > 0) {
     // console.log(this.id);
       var data = google.visualization.arrayToDataTable(x);
       var options = {
        title: this.title,
        legend: 'bottom',
        //is3D: true,
      // slices: {2:{offset: 0.3}},
        width:this.w,
        height:300,
      //  sliceVisiblityThreshold:0,
        slices: {
          0: {color: '0a4b78'},
          1: {color: '50575e'},
          2: {color: '8a2424'},
          3: {color: '755100'},
          4: {color: '00450c'},
          5: {color: '4f94d4'},
          6: {color: 'bd8600'}
        },
        vAxis: {
          title: this.vtitle
        },
        hAxis: {
          showTextEvery: this.ticks
        },
        chartArea: {width:'80%'
        },


        }
        var chart = new google.visualization.LineChart(document.getElementById(this.id));
        chart.draw(data, options);
       };
      

    }


}
