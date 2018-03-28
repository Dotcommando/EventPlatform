import { Pipe, PipeTransform } from '@angular/core';
import { Friend } from './friend'

@Pipe({
	name: 'SearchFriends'
})
export class SearchFriendsPipe implements PipeTransform {

	transform(friends:Friend[], term:string):Friend[] {
		if (!term || term === '') return [];
		return friends.filter(friend => {
			if (friend.name.toLowerCase().startsWith(term.toLowerCase())) return friend;
		});
	}

}
