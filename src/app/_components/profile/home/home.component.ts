import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { DadjokesService } from '../../../services/dadjokes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient,private dadjokes : DadjokesService ) { 

  }

  API = 'https://icanhazdadjoke.com';
  joke;

  ngOnInit() {
    this.getJokes();
  }

  getJokes() {

    this.dadjokes.getJokes()
    .subscribe((res)=>{
      this.joke = res.joke;
      });
  }
  

}
