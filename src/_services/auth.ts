import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AppUrl } from '../_config/url.config';

@Injectable()
export class AuthService{

    public token: string;
    private userUrl: string = AppUrl.root + '/auth/login';
    private ownerUrl: string = AppUrl.root + '/auth/ownerLogin';
    private httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

    constructor(private http: HttpClient) {
    }

    /** Sign in for any user
     * @param email 
     * @param password 
     * @param url
     */
    private signIn(email: string, password: string, url: string) : Observable<boolean>{

        let body = { email: email, password: password };

        return this.http.post<any>( url, body, this.httpOptions)
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
     * Sign in with a normal user
     * @param email 
     * @param password 
     */
    userSignIn(email: string, password: string){
        return this.signIn(email, password, this.userUrl);
    }

    /**
     * Sign in with a bar owner
     * @param email 
     * @param password 
     */
    ownerSignIn(email: string, password: string){
        return this.signIn(email, password, this.ownerUrl);
    }

    /**
     * Return if an user is auth
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
      return JSON.parse(localStorage.getItem('authUser')).token;
    }

    /**
     * Realiza o sign out
     */
    signOut() {
        localStorage.removeItem('authUser');
    }
}
