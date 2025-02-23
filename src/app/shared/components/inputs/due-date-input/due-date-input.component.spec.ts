import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DueDateInputComponent } from './due-date-input.component';

describe('DueDateInputComponent', () => {
  let component: DueDateInputComponent;
  let fixture: ComponentFixture<DueDateInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DueDateInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DueDateInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
