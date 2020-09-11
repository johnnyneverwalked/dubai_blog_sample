import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DividerSkewComponent } from './divider-skew.component';

describe('DividerSkewComponent', () => {
  let component: DividerSkewComponent;
  let fixture: ComponentFixture<DividerSkewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DividerSkewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DividerSkewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
