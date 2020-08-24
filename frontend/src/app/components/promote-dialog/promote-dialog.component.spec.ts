import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoteDialogComponent } from './promote-dialog.component';

describe('PromoteDialogComponent', () => {
  let component: PromoteDialogComponent;
  let fixture: ComponentFixture<PromoteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
