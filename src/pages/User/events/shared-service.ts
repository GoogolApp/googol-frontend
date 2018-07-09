import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class SharedServiceEvents {

    private emitChange = new Subject<any>();
    changeEmitted = this.emitChange.asObservable();
    
    emit(change: any) {
        this.emitChange.next(change);
    }
}