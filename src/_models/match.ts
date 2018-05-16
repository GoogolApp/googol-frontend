import { Team } from './team';

export class Match {
    _id: number;
    league: string;
    hour: Date;
    home: Team;
    away: Team;

    constructor(_id:number, league:string, hour:Date, hname:string, hlogo:string, aname:string, alogo:string ){
        this._id = _id;
        this.league = league;
        this.hour = hour;
        this.home = new Team(hname, hlogo);
        this.away = new Team(aname, alogo);
    }
};