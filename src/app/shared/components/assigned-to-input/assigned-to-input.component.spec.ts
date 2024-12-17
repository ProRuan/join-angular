import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedToInputComponent } from './assigned-to-input.component';

describe('AssignedToInputComponent', () => {
  let component: AssignedToInputComponent;
  let fixture: ComponentFixture<AssignedToInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignedToInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignedToInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
