import { Injectable } from '@angular/core';
import { Match } from '../_models/match';
import { Event } from '../_models/event';

@Injectable()
export class EventsService {

    fakeStorage = new Array<Event>();
    fakeId = 1;
    fakeLocation = "Bar da putaria - Campina Grande";
    
    constructor() { }

    getAll() {
        return this.fakeStorage;
    }

    getById(_id: string) {
        return this.fakeStorage;
    }

    create(match: Match){
        let event = new Event(this.fakeId, this.fakeLocation, match);
        this.fakeId = this.fakeId + 1;
        this.fakeStorage.push(event);
    }
    
}