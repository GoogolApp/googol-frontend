import { Injectable } from '@angular/core';

@Injectable()
export class MatchesService {

    fakeStorage = [
        {
            league: "Brasileirão Série A",
            hour: new Date(2018, 4, 16, 13, 0, 0, 0),
            home: {
              name: "Botafogo",
              logo: "https://ssl.gstatic.com/onebox/media/sports/logos/KLDWYp-H8CAOT9H_JgizRg_96x96.png"
            },
            away: {
              name: "Fluminense",
              logo: "https://ssl.gstatic.com/onebox/media/sports/logos/fCMxMMDF2AZPU7LzYKSlig_96x96.png"
            }
        },
        {
            league: "Champions League",
            hour: new Date(2018, 4, 26, 15, 45, 0, 0),
            home: {
              name: "Real Madrid",
              logo: "https://ssl.gstatic.com/onebox/media/sports/logos/Th4fAVAZeCJWRcKoLW7koA_96x96.png"
            },
            away: {
              name: "Liverpool",
              logo: "https://ssl.gstatic.com/onebox/media/sports/logos/0iShHhASp5q1SL4JhtwJiw_96x96.png"
            }
        }
    ];

    constructor() { }

    getAll() {
        return this.fakeStorage;
    }

    getById(_id: string) {
        return this.fakeStorage;
    }

}