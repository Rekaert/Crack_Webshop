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
    quantity: "",
    cost: "",
  }
  orders2New: object = {
    orderId: "",
    productId: "",
    quantity: "",
    price: "",
  }

  orders: any = [];
  orders2: any = [];


  constructor(public http: Http, public httpLocalService: HttpLocalService) {

    this.httpLocalService.getUsers();
    this.httpLocalService.getProducts();
    this.httpLocalService.getOrders();

    setTimeout(() => { console.log(this.httpLocalService.orders); }, 1000)
    //setTimeout(() => { this.countCost() }, 1000)
    this.getAll();
    //setTimeout(() => { console.log(this.httpLocalService.users); }, 1000);
    //setTimeout(() => { console.log(this.httpLocalService.products); }, 1000);
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
      }
      );
  }

  createOne() {
    console.log(this.orders2New);
    this.http.post('http://localhost:8080/order/one/create', this.orders2New)
      .subscribe((data) => {
        this.orders.push(JSON.parse(data['_body']));
        this.details(this.orders2New['orderId']);
      }
      );
  }

  update(editOrder) {
    console.log(editOrder);
    this.http.put('http://localhost:8080/order/all/update/' + editOrder._id, editOrder)
      .subscribe((data) => {
        this.getAll();
      })
  }

  updateOne(editOrder) {
    console.log(editOrder);
    /* this.http.put('http://localhost:8080/order/one/update/' + editOrder._id, editOrder)
      .subscribe((data) => {
        this.getAll();
      }) */
  }

  delete(deleteOrder) {

    this.http.delete('http://localhost:8080/order/all/delete/' + deleteOrder._id)
      .subscribe((data) => {
        this.getAll();
      })
  }

  deleteOne(deleteOrder) {

    this.http.delete('http://localhost:8080/order/one/delete/' + deleteOrder._id)
      .subscribe((data) => {
        this.getAll();
      })
  }


}

/*orderRouter.get('/all', OrderController.list);
orderRouter.get('/find/:id', OrderController.find);
orderRouter.post('/create', OrderController.create);
orderRouter.put('/update/:id', OrderController.update);
orderRouter.delete('/delete/:id', OrderController.remove);*/
