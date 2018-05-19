import { Component, OnInit } from '@angular/core';
import { HttpLocalService } from '../http.service';

@Component({
  selector: 'app-kosar',
  templateUrl: './kosar.component.html',
  styleUrls: ['./kosar.component.css']
})
export class KosarComponent implements OnInit {

  constructor(public http: HttpLocalService) { }

  ngOnInit() {
  }

}
