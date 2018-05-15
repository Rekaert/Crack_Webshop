import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormsModule } from '@angular/forms';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: object = {
    name: '',
    url: '',
    image: '',
    manufacturer: '',
    cost: ''
  };


  constructor(public http: Http) {
  }

  ngOnInit() { }


  /**
   * List products in the datas array
   */
  getAll() {
    this.http.get('http://localhost:8080/product/all').subscribe(
      data => {
        this.products = JSON.parse(data['_body']);
        console.log(data);
      });
  }

  /**
   * Create new product
   */

  create() {
    this.http.post('http://localhost:8080/product/create', this.products)
      .subscribe((data) => {
        this.products = JSON.parse(data['_body']);
      }
      );
  }

  /**
   * Update product by given id
   */

  update(editProduct) {
    this.http.put('http://localhost:8080/product/update/' + editProduct._id, editProduct)
      .subscribe((data) => {
        this.products = JSON.parse(data['_body']);
      });
  }

  /**
   * Delete product by given id
   */

  delete(deleteProduct) {
    this.http.delete('http://localhost:8080/product/delete/' + deleteProduct._id)
      .subscribe((data) => {
        this.products = JSON.parse(data['_body']);
      });
  }

}

