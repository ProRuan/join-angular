import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumTaskComponent } from './sum-task.component';

describe('SumTaskComponent', () => {
  let component: SumTaskComponent;
  let fixture: ComponentFixture<SumTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SumTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SumTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
