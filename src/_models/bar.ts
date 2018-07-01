export class Bar{
    _id: string;
    placeId: string;
    name: string;
    latitude: number;
    longitude: number;
    location: {
        coordinates: any;
    };

    promo: {
      createdAt: any,
      content: string
    };

    //from api only
    createdAt: Date;
    eventHistory: any[];

    constructor(placeId?:string, name?:string, latitude?:number, longitude?:number){
        this.placeId = placeId;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
    }

}