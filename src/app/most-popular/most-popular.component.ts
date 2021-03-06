import { Component, OnInit, Inject } from '@angular/core';
import { Friend } from '../friend';
import { FriendsService } from '../friends.service';
import { Observable } from 'rxjs/Observable';
import { PLATFORM_ID } from '@angular/core';
import { MessageService } from '../message.service';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { trigger, state, style, animate, transition, group } from '@angular/animations';
import { TransferVarsService } from '../transfer-vars.service';
import { FriendsStars } from '../friends-list/friends-list.component';

@Component({
	selector: 'app-most-popular',
	templateUrl: './most-popular.component.html',
	styleUrls: ['./most-popular.component.css'],
	animations: [
		trigger('flyInOut', [
			state('in', style({ opacity: 1 })),
			transition('void => *', [
				style({ opacity: 0}),
				animate('.5s ease-in')
			]),
			transition('* => void', [
				animate('.5s ease-in', style({ opacity: 0}))
			])
		])
	]
})
export class MostPopularComponent implements OnInit {

	title: string = "Избранные";

	friends: Friend[];

	favoriteFriends: Friend[] = [];

	staggeringFriends: Friend[] = [];

	checkReady: number;

	next: number = 0;

	stars: Array<FriendsStars> = [];

	constructor(

		private friendsService: FriendsService,
		private messageService: MessageService,
		private transferVarsService: TransferVarsService,
		@Inject(PLATFORM_ID) private platformId: any,
		@Inject('LOCALSTORAGE') private localStorage: any

	) {	}

	ngOnInit() {

		this.getFriends();

		this.checkReady = setInterval(() => {
			if (this.friends != undefined) {
				clearInterval(this.checkReady);
				this.fillFavoriteFriends();
				this.transferVarsService.setFriends(this.favoriteFriends);
				this.doNext();
			}
		}, 500);

		this.transferVarsService.setTitle(this.title);

	}

	checkValInStorage(id: string):boolean {

		if (!isPlatformBrowser(this.platformId)) return false;

		let fav: string = "false";

		fav = localStorage.getItem(id);

		if (fav == "true") {return true;}
		else {return false;}

	}

	getFriends():void {
		this.friendsService.getFriends().subscribe(result => {
			this.friends = result;
			let that = this;
			this.friends.forEach(function(item){
				that.stars.push({id: item._id, stars: that.checkStarsInStorage(item._id)});
			});
		});
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

	fillFavoriteFriends():void {

		if (this.friends.length > 0) {

			let that = this;

			this.friends.forEach(function(item, i, arr) {

				let id: string = item._id;
				if (that.checkValInStorage(id)) {
					that.favoriteFriends.push(item);
				}

			});

		}

	}

	doNext():void {

		if (this.next < this.favoriteFriends.length) {
			this.staggeringFriends.push(this.favoriteFriends[this.next++]);
		}

	}

}
