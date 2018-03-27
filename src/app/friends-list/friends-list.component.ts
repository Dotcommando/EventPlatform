import { Component, OnInit } from '@angular/core';
import { Friend } from '../friend';
import { FriendsService } from '../friends.service';
import { Observable } from 'rxjs/Observable';
import { trigger, state, style, animate, transition, group } from '@angular/animations';
import { TransferVarsService } from '../transfer-vars.service';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css'],
	animations: [
		trigger('flyInOut', [
			state('in', style({ opacity: 1 })),
			transition('void => *', [
				style({ opacity: 0}),
				animate('.2s ease-in')
			]),
			transition('* => void', [
				animate('.2s ease-in', style({ opacity: 0}))
			])
		])
	]
})

export class FriendsListComponent implements OnInit {

	title: string = "Список контактов";

	friends: Friend[];

	staggeringFriends: Friend[] = [];

	selectedFriend: Friend;

	next: number = 0;

	onSelect(friend: Friend): void {
		this.selectedFriend = friend;
	}

	getFriends():void {
		this.friendsService.getFriends().subscribe(result => {this.friends = result;this.doNext();});
		//this.friendsService.getFriends().then(result => this.friends = result); // забираем при помощи промиса
		//this.friendsService.getFriends().subscribe(result => {
		//	this.friends = result.json();
		//	this.shareFriends();
		//});
	}

	doNext():void {

		if (this.next < this.friends.length) {
			this.staggeringFriends.push(this.friends[this.next++]);
		}

	}

	constructor(private friendsService: FriendsService, private transferVarsService: TransferVarsService) { }

	ngOnInit() {
		this.getFriends();
		this.transferVarsService.setTitle(this.title);
	}
}
