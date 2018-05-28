export class Bar{
    
    placeId: string;
    name: string;
    latitude: number;
    longitude: number;
    
    //from api only
    createdAt: Date;
    eventHistory: any[];

    constructor(placeId:string, name:string, latitude:number, longitude:number){
        this.placeId = placeId;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
    }

}