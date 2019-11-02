import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigKeysComponent } from './config-keys.component';

describe('ConfigKeysComponent', () => {
  let component: ConfigKeysComponent;
  let fixture: ComponentFixture<ConfigKeysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigKeysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
