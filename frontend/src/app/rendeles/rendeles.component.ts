import { Component, OnInit } from '@angular/core';
import { HttpLocalService } from '../http.service';
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

  // kosar, ami tartalmazza a sessionStorage-ból lekért termék adatokat
  basket: any;

  // termékek végösszege
  totalPrice: number = 0;

  // modalcím
  modaltitle = '';

  // modalüzenet
  modalbody = '';

  constructor(public http: HttpLocalService, public userService: UsersService) {
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

  // mevizsgálom, h. van-e a sessionStorage-ban basket key, ha van, lekérem belőle az adatokat
  getBasketFromStorage() {
    this.basket = sessionStorage.basket ? JSON.parse(sessionStorage.basket) : [];
    // console.log(sessionStorage.basket, 'baske');
    return this.basket;
  }

  // a kosárba helyezett termékek összegét hozzáadom a totalCost változóhoz
  getTotalPrice() {
    this.totalPrice = 0;
    this.basket.map(item =>
      this.totalPrice += parseInt(item.totalCost))
    console.log(this.totalPrice, 'véösszeg');
  }

  // mennyiség növelése
  addQuantity(basketItem, i) {
    basketItem.quantity++;
    this.basket[i].quantity = basketItem.quantity;
    this.basket[i].totalCost = this.basket[i].quantity * this.basket[i].productCost;
    sessionStorage.basket = JSON.stringify(this.basket);
    this.getBasketFromStorage();
    this.getTotalPrice();
  }

  // mennyiség csökkentése
  removeQuantity(basketItem, i) {
    console.log(this.basket, 'mennyis');
    // tslint:disable-next-line:no-unused-expression
    basketItem.quantity > 1 ? basketItem.quantity-- : basketItem.quantity;
    this.basket[i].quantity = basketItem.quantity;
    this.basket[i].totalCost = this.basket[i].quantity * this.basket[i].productCost;
    sessionStorage.basket = JSON.stringify(this.basket);
    this.getBasketFromStorage();
    this.getTotalPrice();
  }

  // Kiválasztott termék törlése
  deleteProductFromBasket(basketItem) {
    this.basket = this.basket.filter(item => item.productId !== basketItem.productId);
    sessionStorage.basket = JSON.stringify(this.basket);
    // this.getBasketFromStorage();
    this.getTotalPrice();
  }

  messageModal(customer) {
    console.log(customer, 'modal1');
    for (let k in customer) {
      if (customer.szmlcim = '') {
        this.modaltitle = '';
        this.modalbody = '';
        this.modaltitle = 'Hiányos profiladatok!';
        this.modalbody = 'Kérjük, pótolja hiányzó adatait profiloldalán.';
      } else if (customer.szallcim = '') {
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
        this.modaltitle = '';
        this.modalbody = '';
        this.modaltitle = 'Köszönjük vásárlását!';
        this.modalbody = 'Rendelését rögzítettük. Hamarosan felvesszük Önnel a kapcsolatot.';
      }
    }
  }

  sendOrder() {
    this.messageModal(this.customer);
  }

}
