import { Injectable } from '@angular/core';
import { Friend } from './friend';
import { Http, Response } from '@angular/http'; 
import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/toPromise';  // Чтобы забрать инфу промисом
import { MessageService } from './message.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class FriendsService {

	public apiHost: string = './assets/generated.json';

	constructor(private http: Http, private messageService: MessageService) {
		this.getFriends().subscribe();
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

	getFriends(): Observable<any> {

		return this.http.get(this.apiHost);

	}

}
