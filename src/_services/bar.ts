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

}