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

		if (this.friends != undefined) {
			console.log(this.friends);
			this.friend = this.friends.find(friend => friend._id === id);
		}

	}

	getFriends():void {
		this.friendsService.getFriends().subscribe(result => {this.friends = result;});
	}

	//getFriend(): void {

	//	const id:string = this.route.snapshot.paramMap.get('id');
		//this.friendsService.getFriend(id).subscribe(friend => this.friend = friend); // забираем из промиса
		//this.friendsService.getFriend(id);
		//let friend: Object = friendsListComponent.friends.find(friend => friend._id === id);

	//}

}
