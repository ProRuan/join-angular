import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryTaskComponent } from './summary-task.component';

describe('SummaryTaskComponent', () => {
  let component: SummaryTaskComponent;
  let fixture: ComponentFixture<SummaryTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SummaryTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
