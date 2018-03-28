import { Directive, Input, OnChanges, EventEmitter, Output, HostListener } from '@angular/core';
import { SearchFriendsPipe } from './search-friends.pipe';
import { Friend } from './friend';

@Directive({
	selector: '[appSearch]'
})
export class SearchDirective implements OnChanges {

	@Input() friends: Friend[];
	@Output() filterEvent: EventEmitter<any> = new EventEmitter();

	searchTerm: string;

	@HostListener('keyup', ['$event.target.value']) onKeyUp(value) {
		this.searchTerm = value;
		this.applyFilter();
	}

	ngOnChanges() {
		this.applyFilter();
	}

	constructor(private searchFriends: SearchFriendsPipe) { }

	applyFilter = () => {
		this.filterEvent.emit(new SearchFriendsPipe().transform(this.friends, this.searchTerm));
	}

}
