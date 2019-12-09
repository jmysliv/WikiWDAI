import { User } from './user.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private admins: Array<User> = [
    { id: '02b5d5cf-c322-4fd6-bd31-d8473fc43374',
      name: 'admin',
      email: 'admin@admin.com',
      password: 'aaaaaa'
    }
  ];
  private loggedIn: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  REST_API_SERVER = 'http://localhost:3000';
  constructor(private httpClient: HttpClient, private router: Router) { }


  addUser(user: User): Observable<{}> {
    return of(this.httpClient.post<User>(`${this.REST_API_SERVER}/users`, user).subscribe( res => {
       console.log(res);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      } ));
    }

  getUser(id: string) {
    return this.httpClient.get<User>(`${this.REST_API_SERVER}/users/${id}`);
  }

  getUsers() {
    return this.httpClient.get<User[]>(`${this.REST_API_SERVER}/users`);
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  login(login, password, users) {
    let flag = false;
    users.forEach(element => {
      if ( element.email === login && element.password === password ) {
        this.loggedIn.next(element);
        flag = true;
      }
    });
    return flag;
  }

  logout() {
    this.loggedIn.next(null);
  }

  checkIfAdmin(user: User): boolean {
    let flag = false;
    if (user) {
      this.admins.forEach(element => {
          if (user.id === element.id) {
            flag = true;
            return;
          }
        });
    }
    return flag;
  }


  }
