import { Match } from './match';
import { User } from './user';
import { Bar } from './bar';

export class Event {

    _id: string;
    match: Match;
    bar: Bar;
    user: User;
    state: String;
    attendants: Array<User>;

    constructor(_id: string, state:String, match: Match, bar: Bar, user?: User){
        this._id = _id;
        this.match = match;
        this.bar = bar;
        this.user = user;
        this.state = state;
        this.attendants = new Array<User>();
    }
}
