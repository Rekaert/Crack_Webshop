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

  constructor(private http: HttpLocalService,
    private httpClient: HttpClient,
    private userService: UsersService) { }

  ngOnInit() {
    this.userService.getProfile().subscribe(data => {
      console.log(data);
      this.user = data.user;
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
    this.userService.update(this.user).subscribe(user => {
      console.log('update succesfully happened');
      this.user = user;
    })
  }

}
