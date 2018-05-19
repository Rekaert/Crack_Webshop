import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormsModule } from '@angular/forms';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpLocalService } from '../http.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  newProduct: object = {
    name: '',
    url: '',
    manufacturer: '',
    cost: '',
    image: ''
  };

  products: any = [];


  constructor(public http: Http, public httpLocalService: HttpLocalService) {
    this.getAll();
  }

  ngOnInit() { }

  errorHandling(res) {
    res = JSON.parse(res['_body']);
    if (res.error) {
      console.error('API error:' + JSON.stringify(res.error));
    } else {
      this.products = res;
      console.log(this.products);
    }
  }


  /**
   * List products in the datas array
   */
  getAll() {
    this.http.get('http://localhost:8080/product').subscribe(
      data => {
        this.products = JSON.parse(data['_body']);
        this.errorHandling(data);
      });
  }

  /**
   * Create new product
   */

  create() {
    console.log(this.newProduct);
    this.http.post('http://localhost:8080/product', this.newProduct)
      .subscribe((data) => {
        this.newProduct = JSON.parse(data['_body']);
        setTimeout(() => { this.getAll(); }, 1000);
      });
  }

  /**
   * Update product by given id
   */

  update(product) {
    delete product.oldImage;
    if (product.newImage != "" && product.newImage && product.newImage != " ") {
      product.oldImage = product.image;
      product.image = product.newImage;
      delete product.newImage;
    }
    console.log(product);
    this.http.put('http://localhost:8080/product/' + product._id, product)
      .subscribe((data) => {
        this.errorHandling(data);
        setTimeout(() => { this.getAll(); }, 1000);
      });
  }

  /**
   * Delete product by given id
   */

  delete(product) {
    console.log(product);
    this.http.delete('http://localhost:8080/product/' + product._id)
      .subscribe((data) => {
        this.errorHandling(data);
        setTimeout(() => { this.getAll(); }, 1000);
      });
  }

}

