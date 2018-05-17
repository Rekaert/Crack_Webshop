import { Component } from '@angular/core';
/* import { Http, RequestOptions } from '@angular/http'; */
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';
import { User } from './users/user';
import { UsersService } from './users/users.service';
import { HttpLocalService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: any = {
    username: 'YOUR RESGISTERED USERNAME',
    password: 'YOUR RESGISTERED USER PASSWORD'
  };

  /* options = new RequestOptions({ withCredentials: true });
  baseUrl = 'http://localhost:8080/user/'; */

  constructor(public http: HttpLocalService) {
    this.http.auth();
    this.http.getUsers();
  }

  /*     profile() {
          this.http.get(this.baseUrl + 'profile', this.options)
              .subscribe(data => {
                  console.log(data['_body']);
              });
      }
  
      login() {
          this.http.post(this.baseUrl + 'login', this.user, this.options)
              .subscribe(data => {
                  console.log(data['_body']);
              });
      }
  
      logout() {
          this.http.get(this.baseUrl + 'logout', this.options)
              .subscribe(data => {
                  console.log(data['_body']);
              });
      } */
}
