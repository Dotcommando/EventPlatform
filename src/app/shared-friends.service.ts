import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SharedFriendsService {

    private friends = new Subject<any>();

    shareFriends(friends: Object) {
        this.friends.next(friends);
    }

    clearFriends() {
        this.friends.next();
    }

    getFriends(): Observable<any> {
        return this.friends.asObservable();
    }

}
