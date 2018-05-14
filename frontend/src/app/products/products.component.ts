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

  newProduct: object = {
    name: '',
    url: '',
    image: '',
    manufacturer: '',
    cost: ''
  };

  datas: any;

  product: object = {
    _id: '',
    name: '',
    url: '',
    manufacturer: '',
    cost: ''
  };

  constructor(public http: Http) {
    this.getAll();
  }

  ngOnInit() { }

  errorHandling(res) {
    res = JSON.parse(res['_body']);
    if (res.error) {
      console.error('API error:' + JSON.stringify(res.error));
    } else {
      this.datas = res;
      console.log(this.datas);
    }
  }

  /**
   * List products in the datas array
   */
  getAll() {
    this.http.get('http://localhost:8080/product').subscribe(
      data => {
        console.log(data);
        this.datas = data;
        this.errorHandling(data);
      });
  }

  /**
   * Create new product
   */

  create() {
    this.http.post('http://localhost:8080/product', this.newProduct).subscribe(
      data => {
        this.errorHandling(data);
        this.getAll();
        this.newProduct = {};
      });
  }

  /**
   * Update product by given id
   */

  update() {
    this.http.put(`http://localhost:8080/product/${this.product['_id']}`, this.product).subscribe(
      data => {
        this.errorHandling(data);
        this.getAll();
      });
  }

  updateByModal(id) {
    const chosen = this.datas.filter(item => item._id === id)[0];
    this.product = Object.assign({}, chosen);
  }

  /**
   * Delete product by given id
   */

  delete(id) {
    if (confirm('Biztosan törölni szeretné?')) {
      this.http.delete(`http://localhost:8080/product/${id}`).subscribe(
        data => {
          this.errorHandling(data);
          console.log(data);
          this.getAll();
        });
    }

    /**
     * Upload image for products
     */
    imageUpload(id){ }
  }
