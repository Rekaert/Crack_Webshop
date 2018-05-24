import { Component, OnInit } from '@angular/core';
import { HttpLocalService } from '../http.service';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import { User } from './user';
import { UsersService } from '../users.service';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  user = new User();
  message: string = "";
  passwordVerification: string = "";

  constructor(private http: HttpLocalService,
    private userService: UsersService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      for (let i = 0; i < this.users.length; i++) {
        const user = this.users[i];
        user.szallcim = user.szallcim.split("|").join(" ");
        user.szmlcim = user.szmlcim.split("|").join(" ");
      }
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
    this.convertAddressFields();

    if (this.user['password'] && this.passwordVerification != this.user['password']) {
      alert('Kérlek a jelszóváltoztatásnál add meg ugyanazt a jelszót még egyszer.')
      return;
    }

    if (this.user['password'] && this.user['password'].length >= 8) {
      this.userService.create(this.user).subscribe(data => {
        alert('Az új felhasználót sikeresen hozzáadtad.')
        this.ngOnInit();
      });
    } else {
      alert('Minimum 8 hosszú legyen a jelszó')
    }

  }

  /*clearFormData() {
    this.user = new User();
  }*/

  fillUpdateForm(userID: string) {
    this.userService.getUsers().subscribe(users => {

      for (let i = 0; i < users.length; i++) {
        if (users[i]._id === userID) {
          this.user = new User();
          this.user.username = users[i].username;
          this.user.email = users[i].email;
          this.user.perm = users[i].perm;
          this.user.szallcim = users[i].szallcim;
          this.user.szmlcim = users[i].szmlcim;
          this.user._id = users[i]._id;
          this.user.oldpassword = users[i].oldpassword;
          this.user.newpassword = users[i].newpassword;
          this.user.tel = users[i].tel;
          this.convertAddressFieldsBack();
          return;
        }
      }

    });
  }

  update() {
    console.log(this.user);
    this.convertAddressFields();

    if (this.user['newpassword'] && this.passwordVerification != this.user['newpassword']) {
      alert('Kérlek a jelszóváltoztatásnál add meg ugyanazt a jelszót még egyszer.')
      return;
    }

    if (!this.user['newpassword'] || this.user['newpassword'].length >= 8) {
      this.userService.update(this.user).subscribe(data => {
        console.log(data);
        alert('Az adatokat sikeresen frissítetted.')
        this.ngOnInit();
      });
    } else {
      alert('Minimum 8 hosszú legyen a jelszó')
    }
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
