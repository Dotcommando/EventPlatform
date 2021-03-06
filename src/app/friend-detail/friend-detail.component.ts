import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Friend } from '../friend';
import { FriendsService } from '../friends.service';
import { Observable } from 'rxjs/Observable';
import { PLATFORM_ID } from '@angular/core';
import { MessageService } from '../message.service';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { TransferVarsService } from '../transfer-vars.service';
import { FriendsStars } from '../friends-list/friends-list.component';
import { Subscription } from 'rxjs/Subscription';

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

	private subscription: Subscription;

	notAvailable:boolean = false;

	id: string;

	title: string = "Редактирование";

	friend: ExtendedFriend;

	friends: Friend[];

	tempFriend: Friend; // Временная ссылка на объект Friend в глобальном массиве friends

	checkReady: number; // Interval проверки существования массива друзей

	stars: number = 0;

	onBorisClick(e:HTMLElement): void {
		let targetClass: string = "effect-boris_click";
		e.className += " " + targetClass;
		setTimeout(function(){
			e.className = e.className.replace(" " + targetClass, "");
		}, 320);
	}

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private friendsService: FriendsService,
		private location: Location,
		private messageService: MessageService,
		private transferVarsService: TransferVarsService,
		@Inject(PLATFORM_ID) private platformId: any,
		@Inject('LOCALSTORAGE') private localStorage: any
	) {
		//this.subscription = this.route.snapshot.subscribe(params => this.id = params['id']);
	}

	ngOnInit() {

		this.getFriends();

		this.id = this.route.snapshot.paramMap.get('id');

		if (this.stars != undefined) {
			this.stars = this.checkStarsInStorage(this.id);
		}

		this.checkReady = setInterval(() => {
			if (this.friends != undefined) {
				clearInterval(this.checkReady);
			}
			this.selectFriend(this.id);
			this.transferVarsService.setFriends(this.friends);
		}, 500);

		this.transferVarsService.setTitle(this.title);

		this.route.params.subscribe(params => {
			this.id = params['id'];
			this.router.navigate(['/detail/' + this.id]);
			if (this.friends != undefined) {
				this.selectFriend(this.id);
				this.stars = this.checkStarsInStorage(this.id);
			}
		});

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

		if (this.tempFriend == undefined) this.notAvailable = true;

		clearInterval(this.checkReady);

	}

	saveData():void {

		let msg = "Данные сохранены";
		for (let property in this.tempFriend) {
			this.tempFriend[property] = this.friend[property];
		}
		this.messageService.add({message: msg, type: 'success'});

	}

	checkStarsInStorage(id: string):number {

		if (!isPlatformBrowser(this.platformId)) return 0;

		let stars: number = 0;

		stars = parseInt(localStorage.getItem(id + "-stars"));

		return ((stars < 6)&&(stars >= 0))? stars : 0;

	}

	//getFriend(): void {
		//const id:string = this.route.snapshot.paramMap.get('id');
		//this.friendsService.getFriend(id).subscribe(friend => this.friend = friend); // забираем из промиса
	//}

}
