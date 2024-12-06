import { Component, Input, SimpleChanges } from '@angular/core';
declare var google:any;

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.css'
})
export class BarComponent {

  constructor() {}


  @Input() data1;
  @Input() id;
  @Input() type;
  @Input() title;
  @Input() htitle;
  @Input() vtitle;
  @Input() color;
  @Input() width;
  @Input() default;
  @Input() tabnum;
  
  chart:any;
  w;

  ngOnInit() {

   
  }


  ngOnChanges(changes: SimpleChanges): void { 

    if(changes.data1?.currentValue ) {
    
    google.charts.load('current', {packages: ['corechart', 'bar']});
  
    google.charts.setOnLoadCallback(this.drawAnnotations(changes.data1.currentValue));
    }
    this.w = ((this.width / 2) * .8);
 
   }

    drawAnnotations(x) {

    if(x.length > 0) {
     // console.log(this.id);
       var data = google.visualization.arrayToDataTable(x);
       var options = {
        title: this.title,
        legend: 'none',
        width:this.w,
        height:280,
        chartArea: {width:'85%'
        },
        annotations: {
          alwaysOutside: false,
          textStyle: {
            fontSize: 12,
            auraColor: 'none',
            color: '#666'
          },
          boxStyle: {
            stroke: '#ccc',
            strokeWidth: 1,
            gradient: {
              color1: '#f3e5f5',
              color2: '#f3e5f5',
              x1: '0%', y1: '0%',
              x2: '100%', y2: '100%'
            }
          }
        },
        hAxis: {
          title: this.htitle,
          minValue: 0,
        },
        vAxis: {
          title: this.vtitle
        }
      };
      var chart = new google.visualization.BarChart(document.getElementById(this.id));
      chart.draw(data, options);

    }


  }

}




