import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Friend } from '../friend';
import { FriendsService } from '../friends.service';
import { SharedFriendsService } from '../shared-friends.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'app-friend-detail',
	templateUrl: './friend-detail.component.html',
	styleUrls: ['./friend-detail.component.css']
})
export class FriendDetailComponent implements OnInit {

	subscription: Subscription;

	friend: Friend;

	friends: Object;

	constructor(
		private route: ActivatedRoute,
		private friendsService: FriendsService,
		private location: Location,
		private sharedFriends: SharedFriendsService
	) {

		this.subscription = this.sharedFriends.getFriends().subscribe(friends => {
			this.friends = friends;
			//console.log(this.friends);
		});

	}

	ngOnInit(): void {

		const id:string = this.route.snapshot.paramMap.get('id');
		//this.friend = this.friends.find(id => {this._id = id});
		console.log(this.friends);

	}


	getFriend(): void {

		const id:string = this.route.snapshot.paramMap.get('id');
		//this.friendsService.getFriend(id).subscribe(friend => this.friend = friend); // забираем из промиса
		//this.friendsService.getFriend(id);
		//let friend: Object = friendsListComponent.friends.find(friend => friend._id === id);

	}

}
