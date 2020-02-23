import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


export interface User {
  name: string;
  email: string;
  password: string;
  admin: boolean;
}

export interface UserToBeDisplayed {
  id: string;
  name: string;
  email: string;
  token: string;
  admin: boolean;
}

export interface LoginResponse {accessToken: string; refreshToken: string; }

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedIn: BehaviorSubject<UserToBeDisplayed> = new BehaviorSubject<UserToBeDisplayed>(null);
  REST_API_SERVER = 'http://localhost:4000';
  constructor(private httpClient: HttpClient, private router: Router) {
    const token = localStorage.getItem('currentToken');
    if (token) {
      this.httpClient.get<UserToBeDisplayed>(`${this.REST_API_SERVER}/me`,
      { headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${token}`
      })}).subscribe(resp => {
      resp.token = token;
      this.loggedIn.next(resp);
    });
    }
  }

  setUpHeaders() {
    let httpOptions;
    if (this.loggedIn.value) {
      httpOptions = {
            'Content-Type':  'application/json',
            Authorization: `Bearer ${this.loggedIn.value.token}`
        };
    } else {
      httpOptions = {
          'Content-Type':  'application/json',
      };
    }
    return httpOptions;
  }

  addUser(user: User) {
    return this.httpClient.post<User>(`${this.REST_API_SERVER}/users`, user, { headers: this.setUpHeaders()});
    }

  getUser(id: string) {
    return this.httpClient.get<UserToBeDisplayed>(`${this.REST_API_SERVER}/users/${id}`, { headers: this.setUpHeaders()});
  }

  getUsers() {
    return this.httpClient.get<UserToBeDisplayed[]>(`${this.REST_API_SERVER}/users`, { headers: this.setUpHeaders()});
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  login(login, password) {
    let token;
    return this.httpClient.post<LoginResponse>(`${this.REST_API_SERVER}/auth`,  {email: login,
      password}, { headers: this.setUpHeaders()}).subscribe(res => {
      token = res.accessToken;
      localStorage.setItem('currentToken', token);
      this.httpClient.get<UserToBeDisplayed>(`${this.REST_API_SERVER}/me`,
      { headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${token}`
      })}).subscribe(resp => {
      resp.token = token;
      this.loggedIn.next(resp);
    });
      return true;
    }, err => {
      return false;
    });
  }

  logout() {
    localStorage.removeItem('currentToken');
    this.loggedIn.next(null);
  }

  checkIfAdmin(user: UserToBeDisplayed): boolean {
    if (user) {
      return user.admin;
    }
    return false;
  }


  }
