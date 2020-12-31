import {EventEmitter, Injectable, Output} from '@angular/core';
import {User} from "../classes/User";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {tap} from "rxjs/operators";
interface Jwt {
  jwt: string,
  id_utente: number
  nominativo: string,
  response: boolean,
  result: string
}
@Injectable()
export class AuthService {
  private isUserLogged = false;
  @Output() usersignedin = new EventEmitter<User>()
  @Output() usersignedup = new EventEmitter<User>()
  @Output() userlogout = new EventEmitter()

  private APIAUTHURL = 'https://localhost:44317/api/token/';
  constructor(private http: HttpClient) {
  }

  isUserLoggedIn() {

    this.isUserLogged = !!localStorage.getItem('token');
    return this.isUserLogged;
  }

  signIn(email: string, password: string) {

   return  this.http.post(this.APIAUTHURL,
      {
        email: email,
        password: password
      }
    ).pipe(
      tap(
     (payload: Jwt) => {
       console.log(payload)
       localStorage.setItem('token', payload.jwt);
       localStorage.setItem('id_utente' , JSON.stringify(payload.id_utente));
       localStorage.setItem('nominativo' , JSON.stringify(payload.nominativo));
       let user = new User();
       user.name = payload.nominativo;
       user.id = payload.id_utente;
       this.usersignedin.emit(user);
       return true;
     },
   ));
  }

  signUp(username: string, email: string, password: string) {
    const user = new User();
    user.name = username;
    user.email = email;

    return this.http.post(this.APIAUTHURL + 'signup',
      {
        email: email,
        password: password,
        name : username
      }
    ).pipe(tap(
      (payload: Jwt) => {
        localStorage.setItem('token', payload.jwt);
        console.log(payload);
        localStorage.setItem('user' , JSON.stringify(payload));

        this.usersignedup.emit(user);
      } ,
      (httpResp: HttpErrorResponse) => {

        alert(httpResp.message);
      }
    ));
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id_utente');
    localStorage.removeItem('nominativo');
    this.userlogout.emit();
    this.isUserLogged = false;
  }
  getUser(): User {
    const data = JSON.parse(localStorage.getItem('user'));
    let user = new User();
    if(data){
      user.name = data['user_name'];
      user.email = data['email'];
    }
    return user;
  }
  getToken() {
    return localStorage.getItem('token');
  }
}
