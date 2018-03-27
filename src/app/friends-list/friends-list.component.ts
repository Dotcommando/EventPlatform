import { Component, OnInit, Inject } from '@angular/core';
import { Friend } from '../friend';
import { FriendsService } from '../friends.service';
import { Observable } from 'rxjs/Observable';
import { trigger, state, style, animate, transition, group } from '@angular/animations';
import { TransferVarsService } from '../transfer-vars.service';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

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

	stars: Array<FriendsStars> = [];

	onSelect(friend: Friend): void {
		this.selectedFriend = friend;
	}

	getFriends():void {
		this.friendsService.getFriends().subscribe(result => {
			this.friends = result;
			this.doNext();
			let that = this;

			/*this.stars = [
{id: "58a53fbed70607f9bbc3cfb4", stars: 1},
{id: "58a53fbedb9b3e23e98af694", stars: 3},
{id: "58a53fbe07ce8f90a938de71", stars: 2},
{id: "58a53fbe6ae3f1ede9ce3df7", stars: 4},
{id: "58a53fbe68c9c22c77c32451", stars: 3},
{id: "58a53fbe07458fe5709e24b6", stars: 2},
{id: "58a53fbe179305570bb38b47", stars: 4},
{id: "58a53fbec429d3119c9fc94a", stars: 5},
{id: "58a53fbe7b220e6cf28f6784", stars: 1},
{id: "58a53fbe8705cef5b3012354", stars: 2},
{id: "58a53fbe28f224bf08ae34b3", stars: 3},
{id: "58a53fbebd5c7fd7500ca76b", stars: 5},
{id: "58a53fbec47612b1d68b0cce", stars: 4},
{id: "58a53fbe88c406a294abfc90", stars: 2},
{id: "58a53fbee74ae0687095e6d1", stars: 4},
{id: "58a53fbe57b59e19e7e043a1", stars: 1},
{id: "58a53fbefb91752cf1281259", stars: 3},
{id: "58a53fbe1dcc0ea22efac58a", stars: 3},
{id: "58a53fbe8638b84a1563e42f", stars: 4},
{id: "58a53fbec8579cb914a58cf4", stars: 5},
{id: "58a53fbe100afcdf265e69f1", stars: 5},
{id: "58a53fbe30f902e6809215dc", stars: 2},
{id: "58a53fbef8219044ce92ed3e", stars: 1}
			];*/

			this.friends.forEach(function(item){
				that.stars.push({id: item._id, stars: that.checkStarsInStorage(item._id)});
			});
		});

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

	checkStarsInStorage(id: string):number {

		if (!isPlatformBrowser(this.platformId)) return 0;
		let stars: number = 0;
		stars = parseInt(localStorage.getItem(id + "-stars"));
		return ((stars < 6)&&(stars >= 0))? stars : 0;

	}

	getStars(id: string):number {

		return this.stars.find(star => star.id == id).stars;

	}

	constructor(
		private friendsService: FriendsService,
		private transferVarsService: TransferVarsService,
		@Inject(PLATFORM_ID) private platformId: any,
		@Inject('LOCALSTORAGE') private localStorage: any
	) { }

	ngOnInit() {
		this.getFriends();
		this.transferVarsService.setTitle(this.title);
	}
}

export class FriendsStars {
	id: string;
	stars: number;
}
