import { Match } from './match';
import { User } from './user';

export class Event {
    
    _id: number;
    location: string;
    match: Match;
    confirmed_users: Array<User>;

    constructor(_id: number, loc: string, match: Match){
        this._id = _id;
        this.location = loc;
        this.match = match;
        this.confirmed_users = new Array<User>();
    }
}
