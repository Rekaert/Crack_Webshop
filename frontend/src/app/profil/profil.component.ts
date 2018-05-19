import { Component, OnInit } from '@angular/core';
import { HttpLocalService } from '../http.service';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import { User } from '../users/user';
import { UsersService } from '../users.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  user = new User();

  constructor(private http: HttpLocalService,
    private userService: UsersService) { }

  ngOnInit() {
    this.userService.getProfile().subscribe(data => {
      console.log(data);
      this.user = data.user;
    })
  }

}
