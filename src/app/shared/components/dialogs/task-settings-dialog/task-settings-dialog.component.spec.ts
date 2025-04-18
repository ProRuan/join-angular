import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSettingsDialogComponent } from './task-settings-dialog.component';

describe('TaskSettingsDialogComponent', () => {
  let component: TaskSettingsDialogComponent;
  let fixture: ComponentFixture<TaskSettingsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskSettingsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskSettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
