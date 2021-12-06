import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendgridEmailComponent } from './sendgrid-email.component';

describe('SendgridEmailComponent', () => {
  let component: SendgridEmailComponent;
  let fixture: ComponentFixture<SendgridEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendgridEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendgridEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
