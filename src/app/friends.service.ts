import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Friend } from './friend';
import { Http, Response } from '@angular/http'; 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { MessageService } from './message.service';

@Injectable()
export class FriendsService {

	public apiHost: string = './assets/generated.json';

	constructor(private http: Http, private messageService: MessageService) { }
 
	public getFriends(): Promise<Object> {
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

}
