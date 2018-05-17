import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Http, RequestOptions } from '@angular/http';
import { User } from './users/user';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class HttpLocalService {
  private url = 'http://localhost:8080';
  users: any = [];
  products: any = [];
  orders: any = [];
  options = new RequestOptions({ withCredentials: true });
  baseUrl = 'http://localhost:8080/user/';
  isLoggedIn: boolean = false;
  constructor(private httpClient: Http) { }

  getUsers() {
    this.httpClient.get(this.url + '/user/', this.options)
      .subscribe((data) => {
        this.users = JSON.parse(data['_body']);
        console.log(this.users);
      });
  }
  getCost(): Promise<any> {
    return this.httpClient
      .get(this.url + '/order/all')
      .toPromise()
  }
  getOrders() {
    this.httpClient.get(this.url + '/order/all', this.options)
      .subscribe((data) => this.orders = JSON.parse(data['_body']));
  }
  getProducts() {
    this.httpClient.get(this.url + '/product', this.options)
      .subscribe((data) => this.products = JSON.parse(data['_body']));
  }
  register() {
    this.httpClient.post(this.url + '/user/register', {
      username: '', email: '',
      szmlcim: '', szallcim: '', tel: '', perm: '', password: ''
    }).subscribe((data) => console.log(data));
  }

  login(user) {
    this.httpClient.post(this.url + '/user/login', user, this.options)
      .subscribe((data) => {
        data = JSON.parse(data['_body']);
        if (data['success']) {
          this.auth();
        }
      });

  }
  auth() {
    this.httpClient.get(this.url + '/user/profile', this.options)
      .subscribe((data2) => {
        data2 = JSON.parse(data2['_body']).user;
        console.log(data2);
        if (data2['perm'] == 0) {
          this.isLoggedIn = true;
        } else {
          alert('Nem rendelkezel megfelelő jogosultságokkal!')
        }
        if (this.isLoggedIn == false) {
          alert('Hibás adatokat adtál meg!')
        };
      });
  }
  logout() {
    this.httpClient.get(this.url + '/user/logout', this.options)
      .subscribe((data) => {
        data = JSON.parse(data['_body']);
        if (data['success']) {
          this.isLoggedIn = false;

        }
        console.log(this.isLoggedIn)

      });

  }
}
  /*
    delete(Userid): Observable<void> {
      console.log('Deleting ID: ' + Userid);
      return this.httpClient.delete<void>(this.url + Userid);
    }
  
    save(user: User): Observable<User> {
      if (user.id) {
        return this.httpClient.put<User>(this.url + user.id, user);
      } else {
        return this.httpClient.post<User>(this.url, user);
      }
    } */

