import { Component } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';

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

  options = new RequestOptions({ withCredentials: true });
  baseUrl = 'http://localhost:8080/user/';

  constructor(public http: Http) {

  }

  profile() {
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
  }


  /**
   * File upload test
   */
  datas: any;
  selectedFile: File = null;

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  upload() {
    const body = new FormData();
    body.append('productImg', this.selectedFile, this.selectedFile.name);
    this.http.post('http://localhost:8080/upload/', body).subscribe(
      data => this.datas = JSON.parse(data['_body']),
      err => {
        console.error('Valami nem jóó');
      },
      () => {
        console.log(this.datas);
      }
    );
  }
