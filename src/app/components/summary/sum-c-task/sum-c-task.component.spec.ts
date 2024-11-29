import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumCTaskComponent } from './sum-c-task.component';

describe('SumCTaskComponent', () => {
  let component: SumCTaskComponent;
  let fixture: ComponentFixture<SumCTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SumCTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SumCTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
