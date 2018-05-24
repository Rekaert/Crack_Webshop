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
    username: '',
    password: '',
  };

  newUser: any = {
    username: '',
    password: '',
    passwordRe: '',
    email: '',
    szallcim: '',
    szmlcim: '',
    tel: '',
  };

  newUsersAddress: any = {
    szallcim_iranyitoszam: '',
    szallcim_varos: '',
    szallcim_utca: '',
    szmlcim_iranyitoszam: '',
    szmlcim_varos: '',
    szmlcim_utca: '',
  };

  emailRegex: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // nameRegex: any = /a-zA-Z/;
  constructor(public http: HttpLocalService) {
  }

  ngOnInit() {
  }

  login(): any {

    console.log(this.user);
    this.http.login(this.user);
    this.logged = true;
    this.http.getUsers();
    this.log = this.user['username'];
  }
  logout(): any {
    this.http.logout();
    this.logged = false;
  }

  register(): any {
    if (!this.newUser.tel) {
      this.newUser.tel = 'Még nincs megadva';
    }
    if (!(this.emailRegex.test(String(this.newUser.email).toLowerCase()))) {
      alert('Nem megflelő emailcímet adtál meg !');
    } else {
      if (this.newUser.password === this.newUser.passwordRe) {
        this.newUser.perm = 1;
        this.newUser.szmlcim = [
          this.newUsersAddress.szmlcim_iranyitoszam,
          this.newUsersAddress.szmlcim_utca,
          this.newUsersAddress.szmlcim_varos
        ].join('|');
        this.newUser.szallcim = [
          this.newUsersAddress.szallcim_iranyitoszam,
          this.newUsersAddress.szallcim_utca,
          this.newUsersAddress.szallcim_varos
        ].join('|');
        this.http.register(this.newUser);
        alert('Sikeres regisztráció!');
      } else {
        alert('Nem egyeznek a megadot jelszavak !');
      }
    }
  }
}

