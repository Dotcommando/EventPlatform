import { Injectable } from '@angular/core';

export class timer {
	message: string;
	index: number;
	timer: Object;
}

export class message {
	message: string;
	type: string;
}

@Injectable()
export class MessageService {

	messages: message[] = [];

	timersArray: Array<timer> = [];

	add(message: message):void {
		this.messages.push(message);
		this.timersArray.push({
			message: message.message,
			index:this.timersArray.length,
			timer: setTimeout(() => {
				this.messages.splice(0, 1);
				this.timersArray.splice(0, 1);
			}, 5000)
		});
	}

	clear():void {
		this.messages = [];
		this.timersArray = [];
	}

	constructor() { }

}
