import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { trigger, state, style, animate, transition, group } from '@angular/animations';

@Component({
	selector: 'app-messages',
	templateUrl: './messages.component.html',
	styleUrls: ['./messages.component.css'],
	animations:	[
		trigger('easeIn', [
			transition('void => *', [
				style({ opacity: 0}),
				animate('.5s ease-in')
			]),
			transition('* => void', [
				animate('.5s ease-in', style({ opacity: 0}))
			])
		])
	]
})

export class MessagesComponent implements OnInit {

	constructor(public messageService: MessageService) { }

	ngOnInit() {
	}

}
