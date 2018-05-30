export class Match {
    
    _id: string;
    stadium: string;
    league:string;
    round:string;
    matchDate:Date;
    homeTeam:string;
    homeTeamLogoUrl:string;
    homeTeamScore:string;
    awayTeam:string;
    awayTeamLogoUrl:string;
    awayTeamScore:string;

    constructor(_id:string, stadium:string, league:string, round:string, matchDate:Date,
                homeTeam:string, homeTeamLogoUrl:string, homeTeamScore:string,
                awayTeam:string, awayTeamLogoUrl:string, awayTeamScore:string) {
        this._id = _id;
        this.stadium = stadium;
        this.league = league;
        this.round = round;
        this.matchDate = matchDate;
        this.homeTeam = homeTeam;
        this.homeTeamLogoUrl = homeTeamLogoUrl;
        this.homeTeamScore = homeTeamScore;
        this.awayTeam = awayTeam;
        this.awayTeamLogoUrl = awayTeamLogoUrl;
        this.awayTeamScore = awayTeamScore;
    }
};