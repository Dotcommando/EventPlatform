import { Component, OnInit } from '@angular/core';
import { Friend } from '../friend';
import { FriendsService } from '../friends.service';
import { SharedFriendsService } from '../shared-friends.service';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})

export class FriendsListComponent implements OnInit {

	public friends: Object;

	selectedFriend: Friend;

	onSelect(friend: Friend): void {
		this.selectedFriend = friend;
	}

	getFriends(): void {
		//this.friendsService.getFriends().then(result => this.friends = result); // забираем при помощи промиса
		this.friendsService.getFriends().subscribe(result => {
			this.friends = result.json();
			this.shareFriends();
		});
	}

	shareFriends():void {
		this.sharedFriends.shareFriends(this.friends);
	}

	constructor(private friendsService: FriendsService, private sharedFriends: SharedFriendsService) { }

	ngOnInit() {
		this.getFriends();
	}

}
