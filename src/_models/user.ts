export class User{
    _id: string;
    name: string;
    email: string;
    
    constructor(_id: string, name: string, email: string){
        this._id = _id;
        this.name = name;
        this.email = email;
    }
}