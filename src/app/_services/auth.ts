import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'

import { appConfig } from '../app.config';

@Injectable()
export class AuthService{
    constructor(private http: HttpClient) { }

    signIn(email: string, password: string) {
        return this.http.post<any>(appConfig.apiUrl + '/authenticate', { email: email, password: password })
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    if(user.success){
                        localStorage.setItem('currentUser', JSON.stringify(user));
                    }
                }
                console.log(user);
                return user;
            });
    }
    
    isAuthenticated(){
        return true;
        /**if(localStorage.getItem('currentUser')){
            return true
        }else{
            return false
        }*/
    }

    signOut() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}