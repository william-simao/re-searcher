import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFormAddComponent } from './home-form-add.component';

describe('HomeFormAddComponent', () => {
  let component: HomeFormAddComponent;
  let fixture: ComponentFixture<HomeFormAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeFormAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFormAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
