import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Friend } from './friend';
import { FriendsService } from './friends.service';
import { BrowserModule } from '@angular/platform-browser';

@Component({
	selector: 'body',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [ FriendsService ]
})
export class AppComponent implements OnInit {

	title = 'Менеджер контактов';
	
	friends: Object;

	selectedFriend: Friend;

	onBorisClick(e:HTMLElement): void {
		let targetClass: string = "effect-boris_click";
		e.className += " " + targetClass;
		setTimeout(function(){
			e.className = e.className.replace(" " + targetClass, "");
		}, 320);
	}

	onSelect(friend: Friend): void {
		this.selectedFriend = friend;
	}

	getFriends(): void {
		this.friendsService.getFriends().then(result => this.friends = result);
	}

	constructor(private friendsService: FriendsService) { }

	ngOnInit() {
		this.getFriends();
	}

}
