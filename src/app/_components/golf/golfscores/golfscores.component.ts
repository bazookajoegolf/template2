import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
//import { GolfscoresDataSource, GolfscoresItem } from './golfscores-datasource';

import { ScoreService } from '../../../services/score.service';


//import { LoginService } from 'src/app/services/login.service';
import { AlertService } from './../../../services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-golfscores',
  templateUrl: './golfscores.component.html',
  styleUrls: ['./golfscores.component.css']
})
export class GolfscoresComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 // @ViewChild(MatTable) table!: MatTable<GolfscoresItem>;
  @ViewChild(MatTable) table!: MatTable<any>;
  dataSource; //= new GolfscoresDataSource(this.scores);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  constructor( private score: ScoreService, private router: Router, private alert: AlertService) {

  }
  userid;
  scores=[];
  hcArray=[];
  lowScores =[];

  ngOnInit() {
    this.userid = localStorage.getItem('userid');
    this.getScore(this.userid);
    this.dataSource= this.scores;

    
      
  }


  getScore(x) {

    this.score.getScoreId(x)
      .subscribe((s) => {
       // this.roundsplayed = s.scores.scores.length;
       // this.currenthandicap = s.scores.handicap;
      // console.log("Scores " + JSON.stringify(s.scores.scores));
       this.scores = s.scores.scores; 
       this.hcArray = s.scores.handicapArray;
       this.lowScores = s.scores.lowScoresArray;
       console.log(JSON.stringify(this.scores));

               
      });
      
  }

 


  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

    
  }


}
