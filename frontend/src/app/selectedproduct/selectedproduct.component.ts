import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
@Component({
  selector: 'app-selectedproduct',
  templateUrl: './selectedproduct.component.html',
  styleUrls: ['./selectedproduct.component.css']
})
export class SelectedproductComponent implements OnInit {
  id: string;
  prod: any;
  constructor(private route: ActivatedRoute, public http: Http) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getOne();
  }
  getOne() {
    this.http.get('http://localhost:8080/product/url/' + this.id).subscribe(
      data => {
        this.prod = JSON.parse(data['_body'])[0];
        console.log(this.prod);
      });
  }
  ngOnInit() {

  }

}
