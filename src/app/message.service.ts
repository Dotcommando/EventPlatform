import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

	messages: Object[] = [];

	add(message: Object) {
		this.messages.push(message);
		let last = this.messages.length - 1;
		setTimeout(() => {
			this.messages.splice(last, 1);
		}, 5000);
	}

	clear() {
		this.messages = [];
	}

	constructor() { }

}
