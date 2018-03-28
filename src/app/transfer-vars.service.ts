import { Injectable } from '@angular/core';
import { Friend } from './friend';

@Injectable()
export class TransferVarsService {

	private title:string = "";

	private friends:Friend[] = [];

	public setTitle(title: string):void {
		this.title = title;
	}

	public setFriends(friends: Friend[]):void {
		this.friends = friends;
	}

}
