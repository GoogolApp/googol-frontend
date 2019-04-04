import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { User } from '../_models/user';
import { Bar } from "../_models/bar";
import { AppUrl } from '../_config/url.config';
import { Event } from '../_models/event';

@Injectable()
export class UsersService {

    private url: string = AppUrl.root + '/users';
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

    getFollowingUsers() : Observable<User> {
        let authUserId = JSON.parse(localStorage.getItem('authUser')).userId;
        return this.http.get<User>(this.url + '/' + authUserId + '/following', this.httpOptions)
            .map(user => {
                return user.following;
            });
    }

    getFollowingBars() : Observable<Bar> {
        let authUserId = JSON.parse(localStorage.getItem('authUser')).userId;
        return this.http.get<Bar>(this.url + '/' + authUserId + '/followingBars', this.httpOptions)
            .map(bar => {
                return bar.followingBars;
            })
    }

    getAllFollowers() : Observable<User> {
        let authUserId = JSON.parse(localStorage.getItem('authUser')).userId;
        return this.http.get<User>(this.url + '/' + authUserId + '/followers', this.httpOptions)
            .map(user => {
                return user;
            });
    }

    follow(operation: string, user: string) : Observable<User>{
        let authUserId = JSON.parse(localStorage.getItem('authUser')).userId;
        let body = { operation: operation, user: user };
        return this.http.patch<User>( this.url + '/' + authUserId + '/following', body, this.httpOptions)
        .map(user => {
            return user;
        });
    }

    followBar(operation: string, barId: string) : Observable<User>{
        let authUserId = JSON.parse(localStorage.getItem('authUser')).userId;
        let body = { operation: operation, barId: barId };
        return this.http.patch<User>( this.url + '/' + authUserId + '/followingBars', body, this.httpOptions)
        .map(user => {
            console.log('respostareq');
            console.log(user);
            return user;
        });
    }

    addTeam(operation: string, team: string) : Observable<User>{
        let authUserId = JSON.parse(localStorage.getItem('authUser')).userId;
        let body = { operation: operation, favTeamId: team };
        return this.http.patch<User>( this.url + '/' + authUserId + '/favTeam', body, this.httpOptions)
        .map(user => {
            return user;
        });
    }

    saveEditions(username:string , password:string) : Observable<User>{
        let authUserId = JSON.parse(localStorage.getItem('authUser')).userId;
        let body = { username:username, password:password };
        return this.http.put<User>( this.url + '/' + authUserId, body, this.httpOptions)
        .map(user => {
            return user;
        });
    }

    async getFeed (userId: string) {
        
        const events = <any> await this.http.get(`${AppUrl.root}/events/feed/${userId}`).toPromise();
        const promotions = <any> await this.http.get(`${this.url}/${userId}/followingBars/promo`).toPromise();

        return [
            ...events.filter(ev => +(new Date(ev.match.matchDate)) >= +(new Date())), 
            ...promotions,
        ];
    }
}
