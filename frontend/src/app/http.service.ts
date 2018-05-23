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
  proba: any = 0;
  kitilt: boolean = false;
  user: any;
  users: any = [];
  products: any = [];
  orders: any = [];
  options = new RequestOptions({ withCredentials: true });
  baseUrl = 'http://localhost:8080/user/';
  isLoggedIn: boolean = false;
  typeOfUser: number = 2;
  categories: any = [];
  constructor(private httpClient: Http) { }

  getUsers() {
    this.httpClient.get(this.url + '/user/', this.options)
      .subscribe((data) => {
        this.users = JSON.parse(data['_body']);

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

  /**profile comp. - saját megrendelések lekérése */
  getOwnOrders() {
    this.httpClient.get(this.url + '/order/all/own', this.options)
      .subscribe((data) => {
        this.orders = JSON.parse(data['_body'])
        this.orders.forEach(order => {
          order.status = 'Lezárt';
        });
      });
  }
  getProducts() {
    this.httpClient.get(this.url + '/product', this.options)
      .subscribe((data) => this.products = JSON.parse(data['_body']));
  }
  register(newUser) {
    this.httpClient.post(this.url + '/user/register', newUser)
      .subscribe((data) => console.log(data));
  }

  login(user) {
    this.httpClient.post(this.url + '/user/login', user, this.options)
      .subscribe((data) => {
        data = JSON.parse(data['_body']);
        if (data['success']) {
          this.auth();
          this.proba = 0;
        }
      }, err => {
        this.proba++;
        if (this.proba == 5) {
          this.kitilt = true;
          setTimeout(() => {
            this.kitilt = false;
          }, 1000 * 60 * 5)
        }
        alert(`Hibás adatokat adtál meg! Még ${5 - this.proba} lehetőséged van`);
      });

  }
  auth() {
    this.httpClient.get(this.url + '/user/profile', this.options)
      .subscribe((data2) => {
        data2 = JSON.parse(data2['_body']).user;
        this.user = data2;
        if (data2) {
          if (data2['perm'] == 0) {
            this.isLoggedIn = true;
            this.typeOfUser = 0;
            /* console.log(this.typeOfUser); */
          } else if (data2['perm'] == 1) {
            this.typeOfUser = 1;
            this.isLoggedIn = true;
            /* console.log(this.typeOfUser); */
          }
          else {
            alert('Nem rendelkezel megfelelő jogosultságokkal!')
          }
        }

      });
  }

  logout() {
    this.httpClient.get(this.url + '/user/logout', this.options)
      .subscribe((data) => {
        data = JSON.parse(data['_body']);
        if (data['success']) {
          this.isLoggedIn = false;
          location.reload();
        }

      });

  }

  /**
   * Kategoriak CRUD
   */
  getCategories() {
    this.httpClient.get('http://localhost:8080/kategoria')
      .subscribe((data) => {
        this.categories = JSON.parse(data['_body']);
      });
  }

  createCategory(newCategory) {
    this.httpClient.post('http://localhost:8080/kategoria', newCategory)
      .subscribe(() => {
        this.getCategories();
      }
      );
  }

  updateCategory(category) {
    this.httpClient.put(`http://localhost:8080/kategoria/${category._id}`, category)
      .subscribe(() => {
        this.getCategories();
      }
      );
  }

  deleteCategory(category) {
    this.httpClient.delete(`http://localhost:8080/kategoria/${category._id}`)
      .subscribe(() => {
        this.getCategories();
      }
      );
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

