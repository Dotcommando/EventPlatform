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


@NgModule({
  declarations: [
    AppComponent,
    FriendDetailComponent,
    FriendsListComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
	BrowserAnimationsModule,
	FormsModule,
	HttpModule
  ],
  providers: [FriendsService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
