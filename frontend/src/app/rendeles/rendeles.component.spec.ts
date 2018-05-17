import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RendelesComponent } from './rendeles.component';

describe('RendelesComponent', () => {
  let component: RendelesComponent;
  let fixture: ComponentFixture<RendelesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RendelesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RendelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
