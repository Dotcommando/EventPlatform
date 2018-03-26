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
import { SharedFriendsService } from './shared-friends.service';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';


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
	HttpModule,
	AppRoutingModule
  ],
  providers: [FriendsService, MessageService, SharedFriendsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
