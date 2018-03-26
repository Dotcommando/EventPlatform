import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Friend } from './friend';
import { MessageService } from './message.service';
import { FriendsService } from './friends.service';

@Injectable()
export class SharedFriendsService {

	constructor(private friendsService: FriendsService) { }

	private friends: Observable<Friend[]>;
/*
	getFriends():Observable<Friend[]> { // забирает массив объектов Friend из файла
		this.friendsService.getFriends().subscribe(result => {
			this.friends = result.json();
			console.log(this.friends); // Массив объектов, как и надо: (23) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
			return this.friends;
		});
		return this.friends;
	}
*/
}
