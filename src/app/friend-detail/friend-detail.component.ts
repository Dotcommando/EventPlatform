import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Friend } from '../friend';
import { FriendsService } from '../friends.service';
import { Observable } from 'rxjs/Observable';
import { PLATFORM_ID } from '@angular/core';
import { MessageService } from '../message.service';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { TransferVarsService } from '../transfer-vars.service';

export class ExtendedFriend extends Friend {
	favorite: boolean;
	constructor(fav) {
		super();
		this._id = "";
		this.index = 0;
		this.guid = "";
		this.isActive = false;
		this.balance = "";
		this.picture = "http://placehold.it/32x32";
		this.age = 0;
		this.eyeColor = "";
		this.name = "";
		this.gender = "female";
		this.company = "";
		this.email = "";
		this.phone = "";
		this.address = "";
		this.about = "";
		this.registered = "";
		this.latitude = 0;
		this.longitude = 0;
		this.tags = [];
		this.friends = [];
		this.greeting = "";
		this.favoriteFruit = "";
		this.favorite = fav;
	}
}

@Component({
	selector: 'app-friend-detail',
	templateUrl: './friend-detail.component.html',
	styleUrls: ['./friend-detail.component.css']
})
export class FriendDetailComponent implements OnInit {

	title: string = "Редактирование";

	friend: ExtendedFriend;

	friends: Friend[];

	tempFriend: Friend; // Временная ссылка на объект Friend в глобальном массиве friends

	checkReady: number; // Interval проверки существования массива друзей

	onBorisClick(e:HTMLElement): void {
		let targetClass: string = "effect-boris_click";
		e.className += " " + targetClass;
		setTimeout(function(){
			e.className = e.className.replace(" " + targetClass, "");
		}, 320);
	}

	constructor(
		private route: ActivatedRoute,
		private friendsService: FriendsService,
		private location: Location,
		private messageService: MessageService,
		private transferVarsService: TransferVarsService,
		@Inject(PLATFORM_ID) private platformId: any,
		@Inject('LOCALSTORAGE') private localStorage: any
	) { }

	ngOnInit() {

		this.getFriends();

		const id:string = this.route.snapshot.paramMap.get('id');

		this.checkReady = setInterval(() => {
			if (this.friends != undefined) {
				clearInterval(this.checkReady);
			}
			this.selectFriend(id);
		}, 500);

		this.transferVarsService.setTitle(this.title);

	}

	favoriteChanging():boolean {

		if ((!this.friend) || (!this.friend._id)) {
			this.messageService.add({message: 'Объект this.friend не существует или повреждён.', type: 'error'});
			return false;
		}

		let _id = this.friend._id;
		let fav: boolean = true; // сначала заускается обработчик и лишь затем изменяется checkbox

		if ("favorite" in this.friend) {
			if (this.friend.favorite != undefined) fav = !this.friend.favorite;
		}

		if (isPlatformBrowser(this.platformId)) {

			this.locStorage(_id, fav);

		}

	}

	locStorage(id: string, action: boolean):void {

		let msg: string;

		if (action) {
			localStorage.setItem(id, 'true');
			if (this.friend.gender == "female") {
				msg = "Добавлена в избранные";
			} else {
				msg = "Добавлен в избранные";
			}
			this.messageService.add({message: msg, type: 'success'});
		} else {
			if (this.friend.gender == "female") {
				msg = "Удалена из избранных";
			} else {
				msg = "Удалён из избранных";
			}
			localStorage.removeItem(id);
			this.messageService.add({message: msg, type: 'danger'});
		}

	}

	checkValInStorage():boolean {

		if (!isPlatformBrowser(this.platformId)) return false;

		let id: string = this.friend._id;
		let fav: string = "false";

		fav = localStorage.getItem(id);

		if (fav == "true") {return true;}
		else {return false;}

	}

	getFriends():void {
		this.friendsService.getFriends().subscribe(result => {this.friends = result;});
	}

	selectFriend(id: string):void {

		this.friend = new ExtendedFriend(false);

		this.tempFriend = new Friend;
		this.tempFriend = this.friends.find(friend => friend._id === id);

		for (let property in this.tempFriend) {
			this.friend[property] = this.tempFriend[property];
		}

		this.friend.favorite = this.checkValInStorage();

		clearInterval(this.checkReady);

	}

	saveData():void {

		for (let property in this.tempFriend) {
			this.tempFriend[property] = this.friend[property];
		}

	}

	//getFriend(): void {
		//const id:string = this.route.snapshot.paramMap.get('id');
		//this.friendsService.getFriend(id).subscribe(friend => this.friend = friend); // забираем из промиса
	//}

}
