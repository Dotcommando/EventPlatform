import { Component, OnInit } from '@angular/core';
import { Friend } from './friend';
import { TransferVarsService } from './transfer-vars.service';

@Component({
	selector: 'body',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

	title:string = 'Менеджер контактов';

	friends: Friend[] = [];

	onBorisClick(e:HTMLElement): void {
		let targetClass: string = "effect-boris_click";
		e.className += " " + targetClass;
		setTimeout(function(){
			e.className = e.className.replace(" " + targetClass, "");
		}, 320);
	}

	constructor(private transferVarsService: TransferVarsService) { }

	ngOnInit() {}

}
