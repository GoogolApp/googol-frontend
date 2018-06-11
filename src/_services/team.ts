import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Team } from '../_models/team';
import { AppUrl } from '../_config/url.config';

@Injectable()
export class TeamService {

    private url: string = AppUrl.root + '/teams';
    private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    constructor(private http: HttpClient) { }

    getAllTeams() : Observable<Team[]> {
        return this.http.get<Team[]>(this.url, this.httpOptions)
            .map(teams => {
                return teams;
            });
    }
}
