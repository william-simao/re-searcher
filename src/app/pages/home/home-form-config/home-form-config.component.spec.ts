import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFormConfigComponent } from './home-form-config.component';

describe('HomeFormConfigComponent', () => {
  let component: HomeFormConfigComponent;
  let fixture: ComponentFixture<HomeFormConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeFormConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFormConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
