import { Component, OnInit } from '@angular/core';
import { HttpLocalService } from '../http.service';

@Component({
  selector: 'app-rendeles',
  templateUrl: './rendeles.component.html',
  styleUrls: ['./rendeles.component.css']
})
export class RendelesComponent implements OnInit {

  constructor(public http: HttpLocalService) { }

  ngOnInit() {
  }

}
