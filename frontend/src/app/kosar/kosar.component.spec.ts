import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KosarComponent } from './kosar.component';

describe('KosarComponent', () => {
  let component: KosarComponent;
  let fixture: ComponentFixture<KosarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KosarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KosarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
