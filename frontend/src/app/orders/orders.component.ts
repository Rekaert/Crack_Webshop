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

  orders: any = [];


  constructor(public http: Http, public httpLocalService: HttpLocalService) {

    this.httpLocalService.getUsers();
    this.getAll();
    setTimeout(() => { console.log(this.httpLocalService.users); }, 1000);
  }

  ngOnInit() {

  }


  getAll() {
    this.http.get('http://localhost:8080/order/all').subscribe(
      data => {
        this.orders = JSON.parse(data['_body']);
      });
  }

  create() {
    console.log(this.ordersNew);
    this.http.post('http://localhost:8080/order/create', this.ordersNew)
      .subscribe((data) => {
        this.orders.push(JSON.parse(data['_body']));
      }
      );
  }

  update(editOrder) {
    console.log(editOrder);
    this.http.put('http://localhost:8080/order/update/' + editOrder._id, editOrder)
      .subscribe((data) => {
        this.getAll();
      })
  }

  delete(deleteOrder) {

    this.http.delete('http://localhost:8080/order/delete/' + deleteOrder._id)
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
