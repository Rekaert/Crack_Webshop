import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { Http } from '@angular/http';
import { HttpLocalService } from '../http.service';
@Component({
  selector: 'app-selectedproduct',
  templateUrl: './selectedproduct.component.html',
  styleUrls: ['./selectedproduct.component.css']
})
export class SelectedproductComponent implements OnInit {
  id: string;
  prod: any;
  blog: any;
  rateMe: boolean = false;
  quantity: any = 1;
  shop: string = "";
  ownRate: any = {
    userId: "",
    productId: "",
    text: "",
    rateCost: "5",
    rateQuality: "5",
    rateSatis: "5",
  }
  constructor(private route: ActivatedRoute, public http: Http, public httpLocal: HttpLocalService) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.httpLocal.getUsers();
    this.getOne();

  }
  getOne() {
    this.http.get('http://localhost:8080/product/url/' + this.id).subscribe(
      data => {
        this.prod = JSON.parse(data['_body'])[0];
        this.http.get('http://localhost:8080/rate').subscribe(
          rate => {
            let rates = JSON.parse(rate['_body']);
            this.getRate(rates);
            this.blog = rates.filter(item => item.productId == this.prod._id);
            this.getUser();
            if (this.httpLocal.isLoggedIn) {
              this.checkMe();
            }
          });
      });
  }
  getUser() {
    this.http.get('http://localhost:8080/user').subscribe(
      users => {
        let user = JSON.parse(users['_body']);
        for (let i in this.blog) {
          for (let j in user) {
            if (user[j]._id == this.blog[i].userId) {
              this.blog[i].username = user[j].username;
            }
          }
        }

      });
  }
  getRate(rate) {
    this.prod.rateCost = 0;
    this.prod.rateQuality = 0;
    this.prod.rateSatis = 0;
    this.prod.rateCost = 0;
    this.prod.rateNumber = 0;
    for (let j in rate) {
      if (this.prod._id == rate[j].productId) {
        this.prod.rateCost += parseInt(rate[j].rateCost);
        this.prod.rateQuality += parseInt(rate[j].rateQuality);
        this.prod.rateSatis += parseInt(rate[j].rateSatis);
        this.prod.rateNumber++;
      }
    }
    this.prod.rateQuality = this.prod.rateNumber == 0 ? 0 : this.prod.rateQuality / this.prod.rateNumber;
    this.prod.rateSatis = this.prod.rateNumber == 0 ? 0 : this.prod.rateSatis / this.prod.rateNumber;
    this.prod.rateCost = this.prod.rateNumber == 0 ? 0 : this.prod.rateCost / this.prod.rateNumber;


  }
  checkMe() {
    this.http.get('http://localhost:8080/order/all').subscribe(
      orders => {
        let order = JSON.parse(orders['_body']);
        /* console.log(this.httpLocal.user); */
        for (let i in order) {
          if (order[i].userId == this.httpLocal.user._id) {
            this.isBought(order[i]._id);
          }
        }

      });
  }
  isBought(id) {
    this.http.get('http://localhost:8080/order/one/' + id).subscribe(
      orders => {
        let termek = JSON.parse(orders['_body']);
        for (let i in termek) {
          if (termek[i].productId == this.prod._id) {
            this.rateMe = true;
          }
        }
        if (this.rateMe) {
          this.hasComment();
        }
      });
  }
  toBasket() {
    this.quantity = this.quantity > 1 && this.quantity % 1 == 0 ? this.quantity : 1;
    let basket = localStorage.basket ? JSON.parse(localStorage.basket) : [];
    basket.push({
      productId: this.prod._id,
      productName: this.prod.name,
      quantity: this.quantity,
      productCost: this.prod.cost,
      totalCost: this.prod.cost * this.quantity,
    });
    let local = JSON.stringify(basket);
    localStorage.setItem("basket", local);
    this.shoppingAnimation();
    this.httpLocal.basketNumber++;
  }
  shoppingAnimation() {
    this.shop = "shop";
    setTimeout(() => {
      this.shop = "";
    }, this.quantity * 500);
    if (this.quantity > 20) {
      setTimeout(() => {
        this.shop = "";
      }, 10000);
    }
  }
  createRate() {
    if (!this.ownRate._id) {
      this.ownRate.userId = this.httpLocal.user._id;
      this.ownRate.productId = this.prod._id;
      this.ownRate.text = this.ownRate.text == "" ? "Nincs hozzáfűznivalóm" : this.ownRate.text;
      /* console.log(this.ownRate); */
      this.http.post('http://localhost:8080/rate/', this.ownRate).subscribe((data) => {
        location.reload();
      });
    } else {
      this.http.put('http://localhost:8080/rate/' + this.ownRate._id, this.ownRate).subscribe((data) => {
        location.reload();
      });
    }
  }
  hasComment() {
    for (let i in this.blog) {
      if (this.blog[i].userId == this.httpLocal.user._id) {
        this.blog[i].me = true;
        this.rateMe = false;
      }
      else {
        this.blog[i].me = false;
      }
    }
  }
  editBlog(rate) {
    this.rateMe = true;
    this.ownRate = rate;

  }
  ngOnInit() {

  }

}
