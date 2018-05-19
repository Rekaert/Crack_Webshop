import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-selectedproduct',
  templateUrl: './selectedproduct.component.html',
  styleUrls: ['./selectedproduct.component.css']
})
export class SelectedproductComponent implements OnInit {
  public id: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
  }

}
