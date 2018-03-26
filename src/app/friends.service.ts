import { Injectable } from '@angular/core';
import { Friend } from './friend';
import { Http, Response } from '@angular/http'; 
import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/toPromise';  // Чтобы забрать инфу промисом
import { MessageService } from './message.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';
import { of } from 'rxjs/observable/of';

@Injectable()
export class FriendsService {

	public apiHost: string = './assets/generated.json';

	private friends: Friend[];
	
	private friendsObservable: Observable<any>;

	constructor(private http: Http, private messageService: MessageService) {
		//this.getFriends().subscribe();
		this.friendsObservable = this.http.get(this.apiHost)
			.map(response => response.json())
			.do(friends => {
				this.friends = friends;
			})
			.share();
	}

	// Забираем json промисом
/*	public getFriends(): Promise<Object> {
		return this.http.get(this.apiHost)
			.toPromise()
			.then((response) => {
				this.messageService.add({message: 'Список друзей загружен.', type: 'success'});
				return response.json();
			}).catch((err) => {
				this.messageService.add({message: 'Не удалось загрузить список друзей.', type: 'error'});
				console.log(err);
			});
	}
*/
/*
	getFriends(): Observable<any> {

		return this.http.get(this.apiHost);

	}
*/

	getFriends():any {
		if (this.friends) {
			console.log(1);
			return of(this.friends);
		} else {
			console.log(2);
			return this.friendsObservable;
		}
	}

}
