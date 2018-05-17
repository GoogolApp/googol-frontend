export class User{
    username: string;
    token: string;
    
    constructor(_id: string, username: string, email: string){
        this.username = username;
        this.token = "";
    }
}