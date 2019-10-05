import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFormResultComponent } from './home-form-result.component';

describe('HomeFormResultComponent', () => {
  let component: HomeFormResultComponent;
  let fixture: ComponentFixture<HomeFormResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeFormResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFormResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
