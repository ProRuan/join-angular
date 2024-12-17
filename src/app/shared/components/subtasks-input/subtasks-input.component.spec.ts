import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtasksInputComponent } from './subtasks-input.component';

describe('SubtasksInputComponent', () => {
  let component: SubtasksInputComponent;
  let fixture: ComponentFixture<SubtasksInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubtasksInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubtasksInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
