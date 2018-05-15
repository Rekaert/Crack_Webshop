import { Component, OnInit } from '@angular/core';
import { HttpLocalService } from '../http.service';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import { User } from './user';
import { UsersService } from './users.service';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  user = new User();

  constructor(private http: HttpLocalService,
    private userService: UsersService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  delete(id) {
    this.userService.delete(id).subscribe(data => {
      this.ngOnInit();
    });
  }

  create() {
    this.userService.create(this.user).subscribe(data => {
      this.ngOnInit();
    });
  }

  update() {
    this.userService.update(this.user).subscribe(data => {
      this.ngOnInit();
    });
  }

}
