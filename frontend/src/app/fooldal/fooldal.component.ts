import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-fooldal',
  templateUrl: './fooldal.component.html',
  styleUrls: ['./fooldal.component.css']
})
export class FooldalComponent implements OnInit {
  products: any = [];
  item: any = 3;
  constructor(public http: Http) {
    this.getAll();
  }
  getAll() {
    this.http.get('http://localhost:8080/product').subscribe(
      data => {
        data = JSON.parse(data['_body']);
        this.fillRow(data, this.item);
      });
  }
  fillRow(data, num) {
    for (let i = 0; i < data.length / num; i++) {
      let arr = [];
      for (let j = 0; j < num; j++) {

        arr.push(data[i * num + j]);

      }
      this.products.push(arr);
    }
    console.log(this.products);
  }
  changeRow(num) {
    this.products = [];
    this.http.get('http://localhost:8080/product').subscribe(
      data => {
        data = JSON.parse(data['_body']);
        this.fillRow(data, num);
      });
  }
  ngOnInit() {
  }

}
