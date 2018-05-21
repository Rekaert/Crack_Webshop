import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';
import { User } from '../users/user';
import { UsersService } from '../users.service';
import { HttpLocalService } from '../http.service';

const baseUrl = 'http://localhost:8080';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  user = new User();
  orders: any = [];
  message: string = "";

  constructor(private http: HttpLocalService,
    private httpClient: HttpClient,
    private userService: UsersService) { }

  ngOnInit() {
    this.userService.getProfile().subscribe(data => {
      console.log(data);
      this.user = data.user;
      this.convertAddressFieldsBack();
    })
    this.httpClient.get<any>(baseUrl + '/order/all/own', { withCredentials: true })
      .subscribe(orders => {
        this.orders = orders;
        for (let i = 0; i < this.orders.length; i++) {
          this.orders[i].status = 'Lezárt';
        }
      });
  }

  updateProfile() {

    this.convertAddressFields();

    this.userService.update(this.user).subscribe(user => {
      console.log('update succesfully happened');
      this.user = user;
      this.convertAddressFieldsBack();
      this.message = 'update succesfully happened';
    }, err => {
      this.message = 'update failed';
    })
  }

  convertAddressFields() {
    let u = this.user;
    u.szallcim = u.szallcim_irszam + '|' + u.szallcim_varos + '|' + u.szallcim_utca;
    u.szmlcim = u.szmlcim_irszam + '|' + u.szmlcim_varos + '|' + u.szmlcim_utca;
  }

  convertAddressFieldsBack() {
    let u = this.user;
    let szmlcimSplit = u.szmlcim.split('|');
    u.szmlcim_irszam = szmlcimSplit[0];
    u.szmlcim_varos = szmlcimSplit[1];
    u.szmlcim_utca = szmlcimSplit[2];

    let szallcimSplit = u.szallcim.split('|');
    u.szallcim_irszam = szallcimSplit[0];
    u.szallcim_varos = szallcimSplit[1];
    u.szallcim_utca = szallcimSplit[2];
  }

}
