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

  // mennyiség növelése
  buttonAdd = document.querySelector('#addQuantity');

  // mennyiség csökkentése
  buttonRemove = document.querySelector('#removeQuantity');

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
    console.log(sessionStorage.basket, 'baske');
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
  addQuantity(basketItem) {
    console.log(this.basket, 'mennyis');
    basketItem.quantity++;
    // this.basket.filter(item => )
    // this.getTotalPrice();
  }

}
