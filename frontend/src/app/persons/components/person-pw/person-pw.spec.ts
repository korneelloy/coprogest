import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonPw } from './person-pw';

describe('PersonPw', () => {
  let component: PersonPw;
  let fixture: ComponentFixture<PersonPw>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonPw]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonPw);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
