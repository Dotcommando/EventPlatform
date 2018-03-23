import { Component} from '@angular/core';
import { Friend } from './friend';

@Component({
	selector: 'body',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent {

	title = 'Менеджер контактов';

	onBorisClick(e:HTMLElement): void {
		let targetClass: string = "effect-boris_click";
		e.className += " " + targetClass;
		setTimeout(function(){
			e.className = e.className.replace(" " + targetClass, "");
		}, 320);
	}

	constructor() { }

	ngOnInit() {
		
	}

}
