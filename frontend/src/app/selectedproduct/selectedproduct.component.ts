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
  constructor(private route: ActivatedRoute, public http: Http, public httpLocal: HttpLocalService) {
    this.id = this.route.snapshot.paramMap.get('id');
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
            this.checkMe();
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
        console.log(this.httpLocal.user);
        for (let i in order) {
          if (order[i].userId == this.httpLocal.users._id) {
            console.log(order[i], this.rateMe);
          }
        }

      });
  }
  ngOnInit() {

  }

}
