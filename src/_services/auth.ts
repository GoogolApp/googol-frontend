import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { User } from '../_models/user';
import { appConfig } from '../app/app.config';

@Injectable()
export class AuthService{

    public token: string;
    private url: string = appConfig.apiUrl + '/auth/login';
    private httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

    constructor(private http: HttpClient) {
    }

    /**
     * Realiza o signin na aplicação. O retorno representa um login realizado ou não.
     * @param email
     * @param password
     */
    signIn(email: string, password: string) : Observable<boolean>{

        let body = { email: email, password: password };

        return this.http.post<User>( this.url, body, this.httpOptions)
            .map( user => {
                let token = user && user.token;
                if (token) {
                    this.token = token;
                    localStorage.setItem('authUser', JSON.stringify(user));
                    //Signin realizado
                    return true;
                }
                //Signin não realizado
                return false;
            })
    }

    /**
     * Retorna se existe ou não um usuário autorizado no local storage
     */
    isAuthenticated() : boolean{
        if(localStorage.getItem('authUser')){
            return true;
        }else{
            return false;
        }
    }

  /**
   * Retorna o token de autenticação.
   * @returns {string}
   */
  getToken() : string {
    return this.token;
  }

    /**
     * Realiza o sign out
     */
    signOut() {
        localStorage.removeItem('authUser');
    }
}
