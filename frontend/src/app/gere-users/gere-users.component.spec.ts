import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GereUsersComponent } from './gere-users.component';

describe('GereUsersComponent', () => {
  let component: GereUsersComponent;
  let fixture: ComponentFixture<GereUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GereUsersComponent]
    });
    fixture = TestBed.createComponent(GereUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
