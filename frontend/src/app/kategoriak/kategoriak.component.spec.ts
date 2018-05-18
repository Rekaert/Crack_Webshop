import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KategoriakComponent } from './kategoriak.component';

describe('KategoriakComponent', () => {
  let component: KategoriakComponent;
  let fixture: ComponentFixture<KategoriakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KategoriakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KategoriakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
