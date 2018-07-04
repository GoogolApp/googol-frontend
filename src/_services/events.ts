import { Injectable } from '@angular/core';
import { Match } from '../_models/match';
import { Event } from '../_models/event';
import { AppUrl } from '../_config/url.config';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class EventsService {

    fakeStorage = new Array<Event>();
    fakeId = 1;
    fakeLocation = "Bar da putaria - Campina Grande";
    
    private url: string = AppUrl.root + '/events';
    private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    
    constructor(private http: HttpClient) { }


    getAll() : Observable<Event[]> {
        return this.http.get<Event[]>(this.url, this.httpOptions)
            .map(events => {
                return events;
            });
    }

    getById(_id: string) {
        return this.fakeStorage;
    }

    create(matchId: string, barId: string){
        let userId = JSON.parse(localStorage.getItem('authUser')).userId;
        let body = { matchId: matchId, barId: barId, userId: userId };
        return this.http.post<Event>( this.url + '/', body, this.httpOptions)
        .map(event => {
            return event;
        });
    }
    
}