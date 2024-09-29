import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogViewTaskComponent } from './dialog-view-task.component';

describe('DialogViewTaskComponent', () => {
  let component: DialogViewTaskComponent;
  let fixture: ComponentFixture<DialogViewTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogViewTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogViewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
