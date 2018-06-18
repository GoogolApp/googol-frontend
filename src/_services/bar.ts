import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';

import { AppUrl } from '../_config/url.config';
import { Bar } from '../_models/bar';

@Injectable()
export class BarService {

    private url: string = AppUrl.root + '/bar';
    private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    constructor(private http: HttpClient) { }

    /**
     * Create a new bar
     * @param bar 
     */
    create(bar: Bar): Observable<Bar> {

        let body = {
            "placeId": bar.placeId,
            "name": bar.name,
            "latitude": bar.latitude,
            "longitude": bar.longitude
        }

        return this.http.post<Bar>(this.url, body, this.httpOptions)
            .map(bar => {
                return bar;
            })
    }

    /**
     * Get one bar with a given id
     * @param id 
     */
    getOne(id: string) : Observable<Bar> {
        return this.http.get<Bar>(this.url + '/' + id, this.httpOptions)
            .map( bar => {
                return bar;
            })
    }

    getAll() : Observable<Bar[]> {
        return this.http.get<Bar[]>(this.url, this.httpOptions)
            .map(users => {
                return users;
            });
    }

    getByName(name:string) : Observable<Bar[]> {
        return this.http.get<Bar[]>(this.url + '/search?keyword=' + name, this.httpOptions)
            .map(users => {
                return users;
            });
    }

    editBar(bar: any) : Observable<Bar>{
        let body = {
            name: bar.name,
            placeId: bar.placeId,
            eventHistory: bar.eventHistory,
            followers: bar.followers,
            location: bar.location
        };
        return this.http.put<Bar>( this.url + '/' + bar._id, body, this.httpOptions)
        .map(bar => {
            return bar;
        });
    }

}