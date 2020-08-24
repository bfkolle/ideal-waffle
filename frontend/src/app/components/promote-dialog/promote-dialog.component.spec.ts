import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoardService } from './../../services/board/board.service';

import { PromoteDialogComponent } from './promote-dialog.component';

describe('PromoteDialogComponent', () => {
  let component: PromoteDialogComponent;
  let fixture: ComponentFixture<PromoteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatDialogModule ],
      providers: [BoardService, MatDialogRef],
      declarations: [ PromoteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
