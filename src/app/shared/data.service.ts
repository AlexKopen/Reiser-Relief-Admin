import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class DataService {
    loginUnsuccessful = false;
    loginUnsuccessfulSubject = new Subject<boolean>();

    constructor() {
    }

    setLoginUnsuccessful(state: boolean) {
        this.loginUnsuccessful = state;
        this.loginUnsuccessfulSubject.next(this.loginUnsuccessful);
    }
}
