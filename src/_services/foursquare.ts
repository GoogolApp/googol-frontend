import { Injectable } from '@angular/core';

import { foursquare } from '../_config/foursquare.config';

@Injectable()
export class FoursquareService {

    credentialParams: string;

    constructor() { 
        this.credentialParams = 'client_id=' + foursquare.client_id +' &client_secret=' + foursquare.client_secret +
        '&v=' + foursquare._v;
    }

    /**
     * Return suggestions of places that match a given query
     * @param query : Search Query
     * @param callback : Callback the minivenues that match the query
     */
    getSuggestionsXHR(query, callback){
        
        const url = foursquare.url + '/venues/suggestcompletion';
        
        const params = [
            {name: "near", value: "Campina Grande, PB"},
            {name: "query", value: query }
        ];

        this._getXHR(this._parseParams(url, params), response => {
            const minivenues = JSON.parse(response).response.minivenues;
            callback(minivenues);
        });
    }

    /**
     * Old School Async GET using XHR
     * @param url 
     * @param callback 
     */
    private _getXHR(url, callback){
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", url, true);
        xmlHttp.send(null);
    }

    /**
     * Returns a new url string with the params passed (no side effects)
     * @param url 
     * @param params 
     */
    private _parseParams(url, params:Array<any>){
        let parsedurl = url + "?" + this.credentialParams;
        params.forEach( param => {
            parsedurl += "&" + param.name +  "=" + param.value;
        });
        return parsedurl;
    }
    
}