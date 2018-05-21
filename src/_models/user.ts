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

    
    constructor(username?: string, email?: string, password?: string){
        this.username = username;
        this.email = email;
        this.password = password;
        this.following = [];
        this.favTeams = [];
        this.eventHistory = [];
        this.followers = [];
    }
}