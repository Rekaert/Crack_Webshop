import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable()
export class UsersService {
  private baseUrl = 'http://localhost:8080/user/';

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl);
  }

  delete(userId): Observable<void> {
    console.log('Deleting ID: ' + userId);
    return this.httpClient.post<void>(this.baseUrl + '/delete/' + userId, {});
  }

  create(user: User): Observable<User> {
    return this.httpClient.post<User>(this.baseUrl + '/register', user);
  }

  update(user: User): Observable<User> {
    return this.httpClient.post<User>(this.baseUrl + '/update/' + user._id, user);
  }
}
