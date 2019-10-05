import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFormTypesComponent } from './home-form-types.component';

describe('HomeFormTypesComponent', () => {
  let component: HomeFormTypesComponent;
  let fixture: ComponentFixture<HomeFormTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeFormTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFormTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
