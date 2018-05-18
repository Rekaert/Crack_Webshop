import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kapcsolat',
  templateUrl: './kapcsolat.component.html',
  styleUrls: ['./kapcsolat.component.css']
})
export class KapcsolatComponent implements OnInit {
  lat: number = 47.461377;
  lng: number = 19.052771;
  constructor() { }

  ngOnInit() {
  }

}
