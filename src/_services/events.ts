import { Injectable } from '@angular/core';
import { Match } from '../_models/match';
import { Event } from '../_models/event';
import { AppUrl } from '../_config/url.config';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
                console.log(events)
                return events.map(function(event) {
                    return event;
                });
            });
    }
    
    create(matchId: string, barId: string, userId?: string){
        let body;
        if(userId !== undefined) {
            console.log("entrou aqui")
            body = {
                "matchId": matchId,
                "barId": barId,
                "userId": userId
            }
            console.log(body)
        } else {
            body = {
                "matchId": matchId,
                "barId": barId
            }
        }
        return this.http.post<Event>(this.url, body, this.httpOptions)
            .map(events => {
                return events;
            });
    }

    getById(_id: string) {
        return this.fakeStorage;
    }

}
