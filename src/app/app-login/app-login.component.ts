import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { User } from '../user';
import { USERS } from '../mock-users';

@Component({
  selector: 'app-login',
  templateUrl: './app-login.component.html'
})

export class LoginComponent implements OnInit {
  user = new User;
  logedIn = false;
  error: string;

  constructor(private http: Http) {}

  ngOnInit(): void {
    this.logedIn = false;
  }

  onSubmit(): void {
    for (let i = 0; i < USERS.length; i++) {
      if (this.user.email === USERS[i].email && this.user.password === USERS[i].password) {
        this.logedIn = true;
        localStorage.setItem('currentUser', JSON.stringify(this.user));
        console.log('(localStorage) User:' + JSON.parse(localStorage.getItem('currentUser')));
        this.sendPost();
      }// if
    }// for
    for (let i = 0; i < USERS.length; i++) {
      console.log('(login) USERS:' + USERS[i]);
    }
  }// onSubmit()

  sendPost(): void {
    this.http.post('/login/security/' + this.user.id, this.user.password).subscribe(
      resp => console.log(resp),
      err => this.error = err
    );
  }
}// AppLoginComponent
