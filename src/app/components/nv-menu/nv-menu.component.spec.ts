import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NvMenuComponent } from './nv-menu.component';

describe('NvMenuComponent', () => {
  let component: NvMenuComponent;
  let fixture: ComponentFixture<NvMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NvMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NvMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
