import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-kapcsolat',
  templateUrl: './kapcsolat.component.html',
  styleUrls: ['./kapcsolat.component.css']
})
export class KapcsolatComponent implements OnInit {
  lat: number = 47.461377;
  lng: number = 19.052771;

  baseUrl = 'http://localhost:8080/user/';
  options = new RequestOptions({ withCredentials: true });
  currentUser = null;
  mailform = {
    from: '',
    to: 'crcklegowebstore@gmail.com',
    subject: '',
    html: '',
  };
  constructor(public http: Http) { }

  ngOnInit() {
    this.http.get(this.baseUrl + 'profile', this.options)
      .subscribe(data => {
        console.log(data['_body']);
        if (data.ok) {
          this.currentUser = JSON.parse(data['_body']);
          this.currentUser = this.currentUser.user.email;
          console.log(this.currentUser);
          this.mailform.from = this.currentUser;
        }
      });
  }

  sendmailform() {
    this.http.post('http://localhost:8080/sendemail', this.mailform).subscribe(data => {
      console.log(data);
    });
  }
}
