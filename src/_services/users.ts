import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';

import { User } from '../_models/user';
import { appConfig } from '../app/app.config';

@Injectable()
export class UsersService {

    private url: string = appConfig.apiUrl + '/users';
    private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    constructor(private http: HttpClient) { }

    /**
     * Cria um novo usuário
     * @param user 
     */
    create(user: User): Observable<User> {

        let body = {
            "username": user.username,
            "email": user.email,
            "password": user.password
        }

        return this.http.post<User>(this.url, body, this.httpOptions)
            .map(user => {
                return user;
            })
    }

    /**
     * Retorna um único usuário pelo seu id
     * @param id 
     */
    getOne(id: string) : Observable<User> {
        return this.http.get<User>(this.url + '/' + id, this.httpOptions)
            .map( user => {
                return user;
            })
    }

    getAll() : Observable<User[]> {
        return this.http.get<User[]>(this.url, this.httpOptions)
            .map(users => {
                return users;
            });
    }

    getByUsername(username:string) : Observable<User[]> {
        return this.http.get<User[]>(this.url + '/search?keyword=' + username, this.httpOptions)
            .map(users => {
                return users;
            });
    }

}