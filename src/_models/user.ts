export class User{
    _id : string;
    username: string;
    email: string;
    password: string;
    token: string;
    following : any[]; 
    followers : any[];
    favTeams : any[];
    eventHistory: any[];
    reputation : number;

    
    constructor(username?: string, email?: string, password?: string){
        this.username = username;
        this.email = email;
        this.password = password;
        this.following = [];
        this.favTeams = [];
        this.eventHistory = [];
        this.followers = [];
        this.reputation = 0;
    }
}