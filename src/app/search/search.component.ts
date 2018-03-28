import { Component, OnInit, Input } from '@angular/core';
import { Friend } from '../friend';
import { TransferVarsService } from '../transfer-vars.service';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

	@Input() friends: Friend[] = [];

	filteredFriends: Friend[] = this.friends;

	filterFriends = (friends) => {
		this.filteredFriends = friends;
	}

	constructor(private transferVarsService: TransferVarsService) { }

	ngOnInit() {
	}

}
