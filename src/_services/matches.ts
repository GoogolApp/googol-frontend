import { Injectable } from '@angular/core';
import { Match } from '../_models/match';

@Injectable()
export class MatchesService {

    fakeStorage: Match[] = [
        new Match(
            1,
            "Brasileirão Série A",
            new Date(2018, 4, 16, 13, 0, 0, 0),
            "Botafogo",
            "https://ssl.gstatic.com/onebox/media/sports/logos/KLDWYp-H8CAOT9H_JgizRg_96x96.png",
            "Fluminense",
            "https://ssl.gstatic.com/onebox/media/sports/logos/fCMxMMDF2AZPU7LzYKSlig_96x96.png"
        ),
        new Match(
            2,
            "Champions League",
            new Date(2018, 4, 26, 15, 45, 0, 0),
            "Real Madrid",
            "https://ssl.gstatic.com/onebox/media/sports/logos/Th4fAVAZeCJWRcKoLW7koA_96x96.png",
            "Liverpool",
            "https://ssl.gstatic.com/onebox/media/sports/logos/0iShHhASp5q1SL4JhtwJiw_96x96.png"
        )
    ];

    constructor() { }

    getAll() : Match[] {
        return this.fakeStorage;
    }

    getById(_id: string) {
        return this.fakeStorage;
    }

}