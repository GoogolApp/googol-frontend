import { Match } from './match';
import { User } from './user';
import { Bar } from './bar';

export class Event {
    
    _id: string;
    match: Match;
    bar: Bar;
    user: User;
    attendants: Array<User>;

    constructor(_id: string, match: Match, bar: Bar, user?: User){
        this._id = _id;
        this.match = match;
        this.bar = bar;
        this.user = user;
        this.attendants = new Array<User>();
    }
}
