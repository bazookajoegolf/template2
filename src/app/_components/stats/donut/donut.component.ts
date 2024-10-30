import { Component, Input, SimpleChanges } from '@angular/core';
declare var google:any;
//import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-donut',
  standalone: false,
  templateUrl: './donut.component.html',
  styleUrl: './donut.component.css'
})
export class DonutComponent {

  constructor() {}


  @Input() data1;
  @Input() id;
  @Input() type;
  @Input() title;
  @Input() htitle;
  @Input() vtitle;
  @Input() color;
  
  chart:any;

  ngOnInit() {

   
  }


  ngOnChanges(changes: SimpleChanges): void { 

    if(changes.data1?.currentValue ) {
    
    google.charts.load('current', {packages: ['corechart']});
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
        legend: 'right',
       // is3D: true,
      // slices: {2:{offset: 0.3}},
        width:700,
        height:400,
        sliceVisiblityThreshold:0,
        slices: {
          0: {color: '0a4b78'},
          1: {color: '50575e'},
          2: {color: '8a2424'},
          3: {color: '755100'},
          4: {color: '00450c'},
          5: {color: '4f94d4'},
          6: {color: 'bd8600'}
        },
        chartArea: {width:'70%'
        },


        }
        var chart = new google.visualization.PieChart(document.getElementById(this.id));
        chart.draw(data, options);
       };

    }


  }




