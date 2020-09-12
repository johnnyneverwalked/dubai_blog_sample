import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandmarkIndexComponent } from './landmark-index.component';

describe('LandmarkIndexComponent', () => {
  let component: LandmarkIndexComponent;
  let fixture: ComponentFixture<LandmarkIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandmarkIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandmarkIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
