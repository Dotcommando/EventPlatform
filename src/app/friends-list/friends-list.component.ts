import { Component, OnInit } from '@angular/core';
import { Friend } from '../friend';
import { FriendsService } from '../friends.service';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})

export class FriendsListComponent implements OnInit {

	friends: Object;

	selectedFriend: Friend;


	onSelect(friend: Friend): void {
		this.selectedFriend = friend;
	}

	getFriends(): void {
		this.friendsService.getFriends().then(result => this.friends = result);
	}

	constructor(private friendsService: FriendsService) { }

	ngOnInit() {
		this.getFriends();
	}

}
