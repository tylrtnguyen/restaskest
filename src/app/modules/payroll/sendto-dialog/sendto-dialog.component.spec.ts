import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendtoDialogComponent } from './sendto-dialog.component';

describe('SendtoDialogComponent', () => {
  let component: SendtoDialogComponent;
  let fixture: ComponentFixture<SendtoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendtoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendtoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
