import { Bar } from "./bar";

export class Owner{

    _id: string;

    email: string;
    password:string;

    //Location
    bar: Bar;

    //auth
    ownerId: string;
    token: string;

    constructor(email?:string, password?:string){
        this.email = email;
        this.password = password;
    }
}
