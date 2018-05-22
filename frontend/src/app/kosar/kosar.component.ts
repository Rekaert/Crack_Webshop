import { Component, OnInit } from '@angular/core';
import { HttpLocalService } from '../http.service';
import { User } from '../users/user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-kosar',
  templateUrl: './kosar.component.html',
  styleUrls: ['./kosar.component.css']
})
export class KosarComponent implements OnInit {
  /*
    // customer, ami taralmazza a belépett user adatait
    customer: any = {};
  */
  // kosar, ami tartalmazza a sessionStorage-ból lekért termék adatokat
  basket: any;

  // termékek végösszege
  totalPrice: number = 0;
  quantity: number = 0;

  constructor(public http: HttpLocalService, public userService: UsersService) {
    this.getBasketFromStorage();
    this.getTotalPrice();
    this.getTotalQuantity();
  }

  ngOnInit() {
    /*   this.userService.getProfile().subscribe(
         data => {
           console.log(data);
           this.customer = data.user;
         });
       return this.customer;*/
  }

  // mevizsgálom, h. van-e a sessionStorage-ban basket key, ha van, lekérem belőle az adatokat
  getBasketFromStorage() {
    this.basket = sessionStorage.basket ? JSON.parse(sessionStorage.basket) : [];
    console.log(sessionStorage.basket, 'baske');
    return this.basket;
  }

  // a kosárba helyezett termékek összegét hozzáadom a totalCost változóhoz
  getTotalPrice() {
    this.getBasketFromStorage();
    this.basket.map(item =>
      this.totalPrice += parseInt(item.totalCost))
    console.log(this.totalPrice, 'véösszeg');
  }

  getTotalQuantity() {
    this.getBasketFromStorage();
    this.basket.map(item =>
      this.quantity += parseInt(item.quantity))
    console.log(this.quantity, 'osszdb');
  }

}
