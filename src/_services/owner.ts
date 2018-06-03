import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';

import { AppUrl } from '../_config/url.config';
import { Owner } from '../_models/owner';
import { Bar } from '../_models/bar';

@Injectable()
export class OwnerService {

    private url: string = AppUrl.root + '/owner';
    private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    constructor(private http: HttpClient) { }

    /**
     * Create a new owner
     * @param owner 
     */
    create(owner: Owner): Observable<Owner> {

        let body = {
            "email": owner.email,
            "password": owner.password
        }

        return this.http.post<Owner>(this.url, body, this.httpOptions)
            .map(owner => {
                return owner;
            })
    }

    /**
     * Get a single owner by a given id
     * @param id 
     */
    getOne(id: string) : Observable<Owner> {
        return this.http.get<Owner>(this.url + '/' + id, this.httpOptions)
            .map( owner => {
                return owner;
            })
    }

    putBar(id: string, bar: Bar){
        return this.http.put<Owner>(this.url + '/' + id + '/mybar', bar, this.httpOptions)
            .map(
                owner => { 
                    return owner;
                }
            )
    }

}