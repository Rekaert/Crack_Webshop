import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { User } from './users/user';

@Injectable()
export class UsersService {
  private url = 'http://localhost:8080/user/';

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url);
  }

  delete(Userid): Observable<void> {
    console.log('Deleting ID: ' + Userid);
    return this.httpClient.delete<void>(this.url + Userid);
  }

  save(user: User): Observable<User> {
    if (user.id) {
      return this.httpClient.put<User>(this.url + user.id, user);
    } else {
      return this.httpClient.post<User>(this.url, user);
    }
  }

}
