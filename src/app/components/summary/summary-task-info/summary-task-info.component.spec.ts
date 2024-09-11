import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryTaskInfoComponent } from './summary-task-info.component';

describe('SummaryTaskInfoComponent', () => {
  let component: SummaryTaskInfoComponent;
  let fixture: ComponentFixture<SummaryTaskInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryTaskInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SummaryTaskInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
