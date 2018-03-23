import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'; 
import { FriendsService } from './friends.service';

import { AppComponent } from './app.component';
import { FriendDetailComponent } from './friend-detail/friend-detail.component';
import { FriendsListComponent } from './friends-list/friends-list.component';


@NgModule({
  declarations: [
    AppComponent,
    FriendDetailComponent,
    FriendsListComponent
  ],
  imports: [
    BrowserModule,
	FormsModule,
	HttpModule
  ],
  providers: [FriendsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
