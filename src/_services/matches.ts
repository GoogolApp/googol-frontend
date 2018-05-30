import { Injectable } from '@angular/core';
import { Match } from '../_models/match';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appConfig } from '../app/app.config';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MatchesService {

    private url: string = appConfig.apiUrl + '/matches';
    private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    constructor(private http: HttpClient) { }

    getAll() : Observable<Match[]> {
        return this.http.get<Match[]>(this.url, this.httpOptions)
            .map(matches => {
                return matches;
            });
    }

}