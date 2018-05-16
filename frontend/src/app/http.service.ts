import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { User } from './users/user';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class HttpLocalService {
  private url = 'http://localhost:8080';
  users: any = [];
  products: any = [];
  orders: any = [];
  constructor(private httpClient: HttpClient) { }

  getUsers() {
    this.httpClient.get(this.url + '/user/')
      .subscribe((data) => {
        this.users = data;

      });
  }
  getCost(): Promise<any> {
    return this.httpClient
      .get(this.url + '/order/all')
      .toPromise()
  }
  getOrders() {
    this.httpClient.get(this.url + '/order/all')
      .subscribe((data) => this.orders = data);
  }
  getProducts() {
    this.httpClient.get(this.url + '/product')
      .subscribe((data) => this.products = data);
  }
  register() {
    this.httpClient.post(this.url + '/user/register', {
      username: '', email: '',
      szmlcim: '', szallcim: '', tel: '', perm: '', password: ''
    }).subscribe((data) => console.log(data));
  }

  login() {
    this.httpClient.post(this.url + '/user/login', { username: 'helga@gmail.com', password: 'helga' })
      .subscribe((data) => console.log(data));
  }
  logout() {
    this.httpClient.get(this.url + '/user/logout')
      .subscribe((data) => {
        console.log(data);
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

