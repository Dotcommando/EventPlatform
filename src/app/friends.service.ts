import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Friend } from './friend';
import { Http, Response } from '@angular/http'; 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FriendsService {

	public apiHost: string = './assets/generated.json';

	constructor(private http: Http) { }
 
	public getFriends(): Promise<Object> {
			return this.http.get(this.apiHost)
				.toPromise()
				.then((response) => {
					return response.json();
				}).catch((err) => {
				console.log(err);
			});
	}

}
