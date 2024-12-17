import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignableContactComponent } from './assignable-contact.component';

describe('AssignableContactComponent', () => {
  let component: AssignableContactComponent;
  let fixture: ComponentFixture<AssignableContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignableContactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignableContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
