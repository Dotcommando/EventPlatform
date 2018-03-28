import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FriendsService } from './friends.service';

import { AppComponent } from './app.component';
import { FriendDetailComponent } from './friend-detail/friend-detail.component';
import { FriendsListComponent } from './friends-list/friends-list.component';
import { MessageService } from './message.service';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { MostPopularComponent } from './most-popular/most-popular.component';
import { TransferVarsService } from './transfer-vars.service';
import { StarsComponent } from './stars/stars.component';
import { SearchComponent } from './search/search.component';
import { SearchFriendsPipe } from './search-friends.pipe';
import { SearchDirective } from './search.directive';


@NgModule({
  declarations: [
    AppComponent,
    FriendDetailComponent,
    FriendsListComponent,
    MessagesComponent,
    MostPopularComponent,
    StarsComponent,
    SearchComponent,
    SearchFriendsPipe,
    SearchDirective
  ],
  imports: [
    BrowserModule,
	BrowserAnimationsModule,
	FormsModule,
	HttpModule,
	AppRoutingModule
  ],
  providers: [FriendsService, MessageService, TransferVarsService, SearchFriendsPipe, { provide: 'LOCALSTORAGE', useFactory: getLocalStorage }],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getLocalStorage() {
	return (typeof window !== "undefined") ? window.localStorage : null;
}