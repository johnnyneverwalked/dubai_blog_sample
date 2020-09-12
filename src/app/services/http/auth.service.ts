import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {IUser} from '../../interfaces/IUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  readonly _url: string = environment.api + 'auth';

  public user: IUser;


  constructor(public httpClient: HttpClient) {
  }

  public login(username: string, password: string) {
    try {
      return this.httpClient.post(this._url + "/login", {username, password});
    } catch (e) {
    }
  }

  public signup(data: {username: string, password: string, email: string}) {
    try {
      return this.httpClient.post(this._url + "/signup", data || {});
    } catch (e) {
    }
  }


  public logout() {
    try {
      return this.httpClient.get(this._url + "/logout");
    } catch (e) {
    }
  }

  public isLoggedIn() {
    try {
      return this.httpClient.get(this._url + "/status");
    } catch (e) {
    }
  }

}
