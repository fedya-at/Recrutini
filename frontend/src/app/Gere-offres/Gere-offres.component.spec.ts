import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GereOffresComponent } from './Gere-offres.component';

describe('GereOffresComponent', () => {
  let component: GereOffresComponent;
  let fixture: ComponentFixture<GereOffresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GereOffresComponent],
    });
    fixture = TestBed.createComponent(GereOffresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
