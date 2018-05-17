import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedproductComponent } from './selectedproduct.component';

describe('SelectedproductComponent', () => {
  let component: SelectedproductComponent;
  let fixture: ComponentFixture<SelectedproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
