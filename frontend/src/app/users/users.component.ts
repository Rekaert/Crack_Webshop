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
    }, err => {
      console.log(err);
    });
  }

  create() {
    this.userService.create(this.user).subscribe(data => {
      this.ngOnInit();
    });
  }

  clearFormData() {
    this.user = new User();
  }

  fillUpdateForm(userID: string) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i]._id === userID) {
        this.user = new User();
        this.user.username =  this.users[i].username;
        this.user.email =  this.users[i].email;
        this.user.perm =  this.users[i].perm;
        this.user.szallcim =  this.users[i].szallcim;
        this.user.szmlcim =  this.users[i].szmlcim;
        this.user._id =  this.users[i]._id;
        this.user.password =  this.users[i].password;
        return;
      }
    }
  }

  update() {
    this.userService.update(this.user).subscribe(data => {
      this.ngOnInit();
    });
  }

}
