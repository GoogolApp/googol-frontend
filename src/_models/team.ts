export class Team{
    _id : string;
    name : string;
    teamLogoUrl : string;

    
    constructor(name?: string){
        this.name = name;
        this.teamLogoUrl = "";
    }
}