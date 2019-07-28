import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
// import { User } from './user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router) {
    // this.loggedIn.next(true);
    let flag: boolean = localStorage.getItem('app_token') ? true : false;
    this.loggedIn.next(flag);
  }

  // login(user: User) {
  //   if (user.userName !== '' && user.password !== '') {
  //     this.loggedIn.next(true);
  //     this.router.navigate(['/dashboard']);
  //   }
  // }

  allowLogin(){
    this.loggedIn.next(true);
  }

  logout() {
    localStorage.removeItem('app_token');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}

export interface User {
  userName: string;
  password: string;
}