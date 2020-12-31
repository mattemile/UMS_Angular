/* [
    {
      id: 1,
      name: 'Matteo',
      lastname: 'MIleva',
      email: 'dada@gmail.com',
      fiscalcode: 'sadadasdada',
      province: 'Torino',
      phone: '46546',
    },
    {
      id: 2,
      name: 'Matteo2',
      lastname: 'MIleva2',
      email: 'dada@gmail.com',
      fiscalcode: 'sadadasdada',
      province: 'Torino',
      phone: '46546',
    },
    {
      id: 3,
      name: 'Matteo3',
      lastname: 'MIleva3',
      email: 'dada@gmail.com',
      fiscalcode: 'sadadasdada',
      province: 'Torino',
      phone: '46546',
    },
  ];
*/
import { Injectable } from '@angular/core';
import { User } from '../classes/User';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {
  users: User[] = [];
  private APIURL = 'https://localhost:44317/api/Global/';
  constructor(private http: HttpClient, private auth: AuthService) {}
  getAuthHeader(): HttpHeaders {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.auth.getToken(),
    });
    return headers;
  }
  getUsers() {
    return this.http.post<any>(this.APIURL, {
      token: this.auth.getToken(),
      action: 'getanagrafica',
    });
  }
  getUser(id: number) {
    return this.http.post<any>(this.APIURL, {
      token: this.auth.getToken(),
      action: 'getanagraficabyid',
      id: id,
    });
  }

  deleteUser(id: number) {
    return this.http.post<any>(this.APIURL, {
      token: this.auth.getToken(),
      action: 'deleteanagraficabyid',
      id: id,
    });
  }

  updateUser(user: User) {
    return this.http.put<any>(this.APIURL, {
      token: this.auth.getToken(),
      user: user,
      action: 'setanagrafica',
    });
  }

  createUser(user: User) {
    return this.http.post(this.APIURL, user);
  }
}
