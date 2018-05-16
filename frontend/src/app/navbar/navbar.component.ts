import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { HttpLocalService } from '../http.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // modalTitle: string = 'Login';
  logreg: number = -1;
  log: any;
  logged: boolean = false;
  name: string = '';
  datas: any;
  user: object = {
    email: '',
    password: '',
    username: ''
  };

  constructor(public http: HttpLocalService) {
    /* if (localStorage.user) {
       this.log = JSON.parse(localStorage.user);
       this.logged = true;
       // this.http.getTodo(this.log[0]._id);
       // setInterval(() => this.findUrgent(), 1000);
     }*/
  }

  ngOnInit() {
  }
  /*
    switchRegLog() {
      this.modalTitle = this.modalTitle === 'Register' ? 'Login' : 'Register';
      this.logreg = this.logreg * -1;
    }
  async signIn() {
    if (this.logreg === 1) {
      this.login();
    }
    setTimeout(() => {
      this.log = JSON.parse(this.datas);
      console.log(this.log);
      localStorage.user = this.datas;
      this.logged = true;
      location.reload();
      if (this.log === []) {
        this.logged = false;
      }
    }, 500);
  }
  signOut() {
    this.logged = false;
    this.log = undefined;
    // this.http.todos = [];
    localStorage.removeItem('user');
    location.reload();
  }*/

  login(): any {
    this.http.login();
    this.logged = true;
    this.http.getUsers();
    this.log = this.user['username'];
  }
  logout(): any {
    this.http.logout();
    this.logged = false;
  }

}

