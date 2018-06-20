import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { HttpLocalService } from '../http.service';

@Component({
  selector: 'app-fooldal',
  templateUrl: './fooldal.component.html',
  styleUrls: ['./fooldal.component.css']
})
export class FooldalComponent implements OnInit {
  products: any = [];
  item: number = 4;
  kategoria: string = 'all';
  constructor(public http: Http, public httpLocal: HttpLocalService) {
    this.getAll(this.kategoria);
    this.httpLocal.getCategories();

  }
  getAll(category) {
    this.http.get('http://localhost:8080/product').subscribe(
      data => {
        data = JSON.parse(data['_body']);
        this.http.get('http://localhost:8080/kategoria').subscribe(
          cat => {
            cat = JSON.parse(cat['_body']);
            /* console.log(category); */
            data = this.matchCat(cat, data, category);
            this.http.get('http://localhost:8080/rate').subscribe(
              rate => {
                rate = JSON.parse(rate['_body']);
                data = this.getRate(rate, data);
                this.fillRow(data, this.item);
              });
          });

      });
  }
  fillRow(data, num) {
    this.products = [];
    for (let i = 0; i < data.length / num; i++) {
      let arr = [];
      for (let j = 0; j < num; j++) {

        arr.push(data[i * num + j]);

      }
      this.products.push(arr);
    }
    /* console.log(this.products); */
  }
  changeRow(num) {
    this.products = [];
    this.item = num;
    this.getAll(this.kategoria);
  }
  matchCat(cat, data, category) {
    for (let i in data) {
      for (let j in cat) {
        if (data[i].catId == cat[j]._id) {
          data[i].cat = cat[j].name;
        }
      }
    }
    if (category == 'all') {
      data = data.sort((a, b) => {
        let x = new Date(a.createdAt).getTime();
        let y = new Date(b.createdAt).getTime();
        return y - x;
      }).filter((item, index) => index < 10);
    } else {
      data = data.filter(item => item.cat == category);
    }
    return data;

  }
  getRate(rate, data) {
    for (let i in data) {
      data[i].rateCost = 0;
      data[i].rateQuality = 0;
      data[i].rateSatis = 0;
      data[i].rateCost = 0;
      data[i].rateNumber = 0;
      for (let j in rate) {
        if (data[i]._id == rate[j].productId) {
          data[i].rateCost += parseInt(rate[j].rateCost);
          data[i].rateQuality += parseInt(rate[j].rateQuality);
          data[i].rateSatis += parseInt(rate[j].rateSatis);
          data[i].rateNumber++;
        }
      }
      data[i].rateQuality = data[i].rateNumber == 0 ? 0 : data[i].rateQuality / data[i].rateNumber;
      data[i].rateSatis = data[i].rateNumber == 0 ? 0 : data[i].rateSatis / data[i].rateNumber;
      data[i].rateCost = data[i].rateNumber == 0 ? 0 : data[i].rateCost / data[i].rateNumber;
    }

    return data;
  }
  selectCategory(cat) {

    this.kategoria = cat;
    /* console.log(this.kategoria); */
    this.getAll(this.kategoria);
  }
  ngOnInit() {
  }

}
