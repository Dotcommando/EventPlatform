import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Friend } from '../friend';
import { FriendsService } from '../friends.service';
import { Observable } from 'rxjs/Observable';


@Component({
	selector: 'app-friend-detail',
	templateUrl: './friend-detail.component.html',
	styleUrls: ['./friend-detail.component.css']
})
export class FriendDetailComponent implements OnInit {

	friend: Friend;

	friends: Friend[];

	constructor(
		private route: ActivatedRoute,
		private friendsService: FriendsService,
		private location: Location
	) { }

	ngOnInit() {

		this.getFriends();

		const id:string = this.route.snapshot.paramMap.get('id');

		let checkReady: Object;

		if (this.friends == undefined) {
			checkReady = setInterval(() => this.selectFriend(id), 500);
		} else {
			this.selectFriend(id);
			checkReady = {};
		}

	}

	getFriends():void {
		this.friendsService.getFriends().subscribe(result => {this.friends = result;});
	}

	selectFriend(id: string):void {
		this.friend = this.friends.find(friend => friend._id === id);
	}

	//getFriend(): void {
		//const id:string = this.route.snapshot.paramMap.get('id');
		//this.friendsService.getFriend(id).subscribe(friend => this.friend = friend); // забираем из промиса
	//}

}
