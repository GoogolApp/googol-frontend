export class Bar{
    _id: string;
    placeId: string;
    name: string;
    latitude: number;
    longitude: number;
    phone: string;
    location: {
        coordinates: any;
    };

    promo: {
      createdAt: any,
      content: string
    };

    address: string;

  //from api only
    createdAt: Date;
    eventHistory: any[];

    constructor(placeId?:string, name?:string, latitude?:number, longitude?:number, address?:string, phone?:string){
        this.placeId = placeId;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.address = address;
        this.phone = phone;
    }

}
