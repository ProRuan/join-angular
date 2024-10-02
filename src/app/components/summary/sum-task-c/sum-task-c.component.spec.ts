import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumTaskCComponent } from './sum-task-c.component';

describe('SumTaskCComponent', () => {
  let component: SumTaskCComponent;
  let fixture: ComponentFixture<SumTaskCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SumTaskCComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SumTaskCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
