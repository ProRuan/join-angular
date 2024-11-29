import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumATaskComponent } from './sum-a-task.component';

describe('SumATaskComponent', () => {
  let component: SumATaskComponent;
  let fixture: ComponentFixture<SumATaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SumATaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SumATaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
