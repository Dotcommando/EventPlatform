import { Component, OnInit } from '@angular/core';
import { Friend } from '../friend';
import { FriendsService } from '../friends.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})

export class FriendsListComponent implements OnInit {

	friends: Friend[];

	selectedFriend: Friend;

	onSelect(friend: Friend): void {
		this.selectedFriend = friend;
	}

	getFriends():void {
		this.friendsService.getFriends().subscribe(result => {this.friends = result;});
		//this.friendsService.getFriends().then(result => this.friends = result); // забираем при помощи промиса
		//this.friendsService.getFriends().subscribe(result => {
		//	this.friends = result.json();
		//	this.shareFriends();
		//});
	}

	constructor(private friendsService: FriendsService) { }

	ngOnInit() {
		this.getFriends();
	}
}
