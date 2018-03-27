import { Injectable } from '@angular/core';

@Injectable()
export class TransferVarsService {

	private title:string = "";

	public setTitle(title: string):void {
		this.title = title;
	}

}
