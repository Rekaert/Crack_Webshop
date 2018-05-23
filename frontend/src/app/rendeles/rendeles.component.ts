import { Component, OnInit } from '@angular/core';
import { HttpLocalService } from '../http.service';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { User } from '../users/user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-rendeles',
  templateUrl: './rendeles.component.html',
  styleUrls: ['./rendeles.component.css']
})
export class RendelesComponent implements OnInit {

  // customer, ami taralmazza a belépett user adatait
  customer: any = {};

  // kosar, ami tartalmazza a localStorage-ból lekért termék adatokat
  basket: any;

  // termékek végösszege
  totalPrice: number = 0;

  // modalcím
  modaltitle = '';

  // modalüzenet
  modalbody = '';

  // validáció
  btntoggler = true;

  totalPiece = 0;

  constructor(public httpLocal: HttpLocalService, public userService: UsersService, public http: Http) {
    this.getBasketFromStorage();
    this.getTotalPrice();

  }

  ngOnInit() {
    this.userService.getProfile().subscribe(
      data => {
        console.log(data);
        this.customer = data.user;
        console.log(this.customer, 'cusomer');
      });
    return this.customer;
  }

  // mevizsgálom, h. van-e a localStorage-ban basket key, ha van, lekérem belőle az adatokat
  getBasketFromStorage() {
    this.basket = localStorage.basket ? JSON.parse(localStorage.basket) : [];
    // console.log(localStorage.basket, 'baske');
    return this.basket;
  }

  // a kosárba helyezett termékek összegét hozzáadom a totalCost változóhoz
  getTotalPrice() {
    this.totalPrice = 0;
    this.totalPiece = 0;
    this.basket.map(item => {
      this.totalPrice += parseInt(item.totalCost);
      this.totalPiece++;
    });
  }

  // mennyiség növelése
  addQuantity(basketItem, i) {
    basketItem.quantity++;
    this.totalPiece++;
    this.basket[i].quantity = basketItem.quantity;
    this.basket[i].totalCost = this.basket[i].quantity * this.basket[i].productCost;
    localStorage.basket = JSON.stringify(this.basket);
    this.getBasketFromStorage();
    this.getTotalPrice();
  }

  // mennyiség csökkentése
  removeQuantity(basketItem, i) {
    console.log(this.basket, 'mennyis');
    // tslint:disable-next-line:no-unused-expression
    basketItem.quantity > 1 ? (basketItem.quantity-- , this.totalPiece--) : basketItem.quantity;
    this.basket[i].quantity = basketItem.quantity;
    this.basket[i].totalCost = this.basket[i].quantity * this.basket[i].productCost;
    localStorage.basket = JSON.stringify(this.basket);
    this.getBasketFromStorage();
    this.getTotalPrice();
  }

  // Kiválasztott termék törlése
  deleteProductFromBasket(basketItem) {
    this.basket = this.basket.filter(item => item.productId !== basketItem.productId);
    localStorage.basket = JSON.stringify(this.basket);
    // this.getBasketFromStorage();
    this.getTotalPrice();
  }

  messageModal(customer) {
    console.log(customer, 'modal1');

    if (customer.szmlcim === '' || customer.szallcim === '') {
      this.modaltitle = '';
      this.modalbody = '';
      this.modaltitle = 'Hiányos profiladatok!';
      this.modalbody = 'Kérjük, pótolja hiányzó adatait profiloldalán.';
    } else if (this.basket.length === 0) {
      this.modaltitle = '';
      this.modalbody = '';
      this.modaltitle = 'Kosara üres!';
      this.modalbody = 'A rendelés leadásához, helyezzen termékeket a kosárba.';
    } else {
      this.btntoggler = false;
      this.modaltitle = '';
      this.modalbody = '';
      this.modaltitle = 'Köszönjük vásárlását!';
      this.modalbody = 'Rendelését rögzítettük. Hamarosan felvesszük Önnel a kapcsolatot.';
    }
  }

  sendOrder() {
    console.log(this.httpLocal.user._id);
    this.http.post('http://localhost:8080/order/all/create', {
      userId: this.httpLocal.user._id, quantity: this.totalPiece,
      cost: this.totalPrice
    })
      .subscribe((data) => {
        console.log(this.basket);
        let id = JSON.parse(data['_body'])._id;
        for (let i in this.basket) {
          let elkuld = {
            orderId: id,
            productId: this.basket[i].productId,
            quantity: this.basket[i].quantity,
            price: this.basket[i].totalCost
          }
          this.basket[i].productId = id;
          this.http.post('http://localhost:8080/order/one/create', elkuld)
            .subscribe((data) => {
              console.log(data);
            });

        }
      }
      );

    console.log(this.httpLocal.user, );
    this.messageModal(this.customer);
    this.basket = localStorage.clear();
  }




}
