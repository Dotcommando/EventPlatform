import { TestBed, inject } from '@angular/core/testing';

import { SharedFriendsService } from './shared-friends.service';

describe('SharedFriendsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedFriendsService]
    });
  });

  it('should be created', inject([SharedFriendsService], (service: SharedFriendsService) => {
    expect(service).toBeTruthy();
  }));
});
