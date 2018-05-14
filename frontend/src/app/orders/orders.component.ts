import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: object = {
    userID: "",
    productID: "",
    quantity: "",
    cost: "",
  }
  constructor(public http: Http) { }

  ngOnInit() {
  }

  getAll() {
    this.http.get('http://localhost:8080/order/all').subscribe(
      data => {
        this.orders = JSON.parse(data['_body']);
        console.log(data);
      });
  }

  create() {
    this.http.post('http://localhost:8080/order/create', this.orders)
      .subscribe((data) => {
        this.orders = JSON.parse(data['_body']);
      }
      );
  }

  update(editOrder) {
    this.http.put('http://localhost:8080/order/update/' + editOrder._id, editOrder)
      .subscribe((data) => {
        this.orders = JSON.parse(data['_body']);
      })
  }

  delete(deleteOrder) {
    this.http.delete('http://localhost:8080/order/delete/' + deleteOrder._id)
      .subscribe((data) => {
        this.orders = JSON.parse(data['_body']);
      })
  }


}

/*orderRouter.get('/all', OrderController.list);
orderRouter.get('/find/:id', OrderController.find);
orderRouter.post('/create', OrderController.create);
orderRouter.put('/update/:id', OrderController.update);
orderRouter.delete('/delete/:id', OrderController.remove);*/
