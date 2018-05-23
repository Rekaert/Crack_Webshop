import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpLocalService } from '../http.service'
import { setTimeout } from 'core-js/library/web/timers';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  ordersNew: object = {
    userId: "",
    productId: "",
    quantity: 0,
    cost: 0,
  }
  orders2New: object = {
    orderId: "",
    productId: "",
    quantity: 1,
    price: "",
  }
  price: any = {};
  showDetails: boolean = false;
  orders: any = [];
  orders2: any = [];


  constructor(public http: Http, public httpLocalService: HttpLocalService) {

    this.httpLocalService.getUsers();
    this.httpLocalService.getProducts();
    this.httpLocalService.getOrders();

    /*  setTimeout(() => { console.log(this.httpLocalService.orders); }, 1000) */
    //setTimeout(() => { this.countCost() }, 1000)
    this.getAll();

  }

  ngOnInit() {

  }

  /* countCost() {
    for (let i = 0; i < this.orders.length; i++) {
      if (this.orders[i].quantity > 1) {
        this.orders[i].cost = this.orders[i].cost * this.orders[i].quantity;
      }
      console.log(this.orders);
    }
  }
 */
  getAll() {
    this.http.get('http://localhost:8080/order/all').subscribe(
      data => {
        this.orders = JSON.parse(data['_body']);
        console.log(this.httpLocalService.users);
      });
  }

  details(id) {
    for (let i of this.httpLocalService.products) {
      this.price[i._id] = i.cost;
    }
    this.showDetails = true;
    this.http.get('http://localhost:8080/order/one/' + id).subscribe(
      data => {
        this.orders2 = JSON.parse(data['_body']);
        console.log(this.orders2);
      });
    this.orders2New['orderId'] = id;

  }

  create() {
    console.log(this.ordersNew);
    this.http.post('http://localhost:8080/order/all/create', this.ordersNew)
      .subscribe((data) => {
        this.orders.push(JSON.parse(data['_body']));
        this.httpLocalService.getOrders();
      }
      );
  }

  createOne() {

    this.orders2New['price'] = this.orders2New['quantity'] > 1 && this.orders2New['quantity'] % 1 == 0 ? this.price[this.orders2New['productId']] * this.orders2New['quantity'] : this.price[this.orders2New['productId']];
    let edited = this.orders.filter(item => item._id == this.orders2New['orderId'])[0];
    edited.quantity = parseInt(edited.quantity) + parseInt(this.orders2New['quantity']);
    edited.cost = parseInt(edited.cost) + parseInt(this.orders2New['price']);
    this.http.post('http://localhost:8080/order/one/create', this.orders2New)
      .subscribe((data) => {
        /* this.orders.push(JSON.parse(data['_body'])); */
        this.details(this.orders2New['orderId']);
        this.update(edited);
        this.httpLocalService.getOrders();

      }
      );
  }

  update(editOrder) {
    console.log(editOrder);
    this.http.put('http://localhost:8080/order/all/update/' + editOrder._id, editOrder)
      .subscribe((data) => {
        this.httpLocalService.getOrders();
      })
  }

  updateOne(editOrder) {
    editOrder['price'] = editOrder['quantity'] > 1 && editOrder['quantity'] % 1 == 0 ? this.price[editOrder['productId']] * editOrder['quantity'] : this.price[editOrder['productId']];
    let edited = this.orders.filter(item => item._id == this.orders2New['orderId'])[0];
    let edited2 = this.orders2.filter(item => item._id == editOrder._id)[0];
    edited.quantity = 0;
    edited.cost = 0;
    for (let i in this.orders2) {
      edited.quantity = parseInt(edited.quantity) + parseInt(this.orders2[i]['quantity']);
      edited.cost = parseInt(edited.cost) + parseInt(this.orders2[i]['price']);
    }
    this.http.put('http://localhost:8080/order/one/update/' + editOrder._id, editOrder)
      .subscribe((data) => {
        this.details(this.orders2New['orderId']);
        this.update(edited);
        this.httpLocalService.getOrders();
      })
  }

  delete(deleteOrder) {

    this.http.delete('http://localhost:8080/order/all/delete/' + deleteOrder._id)
      .subscribe((data) => {
        this.httpLocalService.getOrders();
      })
  }

  deleteOne(deleteOrder) {
    let edited = this.orders.filter(item => item._id == this.orders2New['orderId'])[0];
    let edited2 = this.orders2.filter(item => item._id == deleteOrder._id)[0];
    edited.quantity = parseInt(edited.quantity) - parseInt(edited2['quantity']);
    edited.cost = parseInt(edited.cost) - parseInt(edited2['price']);
    this.http.delete('http://localhost:8080/order/one/delete/' + deleteOrder._id)
      .subscribe((data) => {
        this.details(this.orders2New['orderId']);
        this.update(edited);
        this.httpLocalService.getOrders();
      })
  }


}

