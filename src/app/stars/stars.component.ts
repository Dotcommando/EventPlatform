import { Component, OnInit, Input, Inject } from '@angular/core';
import { MessageService } from '../message.service';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
	selector: 'app-stars',
	templateUrl: './stars.component.html',
	styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {

	@Input() stars: number;

	@Input() id: string;

	onBorisClick(e:HTMLElement): void {
		let targetClass: string = "effect-boris_click";
		e.className += " " + targetClass;
		setTimeout(function(){
			e.className = e.className.replace(" " + targetClass, "");
		}, 320);
	}

	setStars(index: number):void {

		this.stars = index;
		if (!isPlatformBrowser(this.platformId)) return;
		localStorage.setItem(this.id + "-stars", index.toString());
		this.messageService.add({message: 'Оценка сохранена. ' + index, type: 'success'});

	}

	constructor(
		private messageService: MessageService,
		@Inject(PLATFORM_ID) private platformId: any,
		@Inject('LOCALSTORAGE') private localStorage: any
	) { }

	ngOnInit() {
	}

}
