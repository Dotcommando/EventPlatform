import { TestBed, inject } from '@angular/core/testing';

import { TransferVarsService } from './transfer-vars.service';

describe('TransferVarsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransferVarsService]
    });
  });

  it('should be created', inject([TransferVarsService], (service: TransferVarsService) => {
    expect(service).toBeTruthy();
  }));
});
