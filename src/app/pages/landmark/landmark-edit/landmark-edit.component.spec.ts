import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandmarkEditComponent } from './landmark-edit.component';

describe('LandmarkEditComponent', () => {
  let component: LandmarkEditComponent;
  let fixture: ComponentFixture<LandmarkEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandmarkEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandmarkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
