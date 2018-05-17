import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';

import { User } from '../_models/user';
import { appConfig } from '../app/app.config';

@Injectable()
export class AuthService{

    public token: string;
    private url: string = appConfig.apiUrl + '/api/auth/login';
    private httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

    constructor(private http: HttpClient) { 
        let authUser = JSON.parse(localStorage.getItem('authUser'));
        this.token = authUser && authUser.token;
    }

    /**
     * Realiza o signin na aplicação. O retorno representa um login realizado ou não.
     * @param username 
     * @param password 
     */
    signIn(username: string, password: string) : Observable<boolean>{
        
        let body = { username: username, password: password };

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
            return true
        }else{
            return false
        }
    }

    /**
     * Realiza o sign out
     */
    signOut() {
        localStorage.removeItem('authUser');
    }
}