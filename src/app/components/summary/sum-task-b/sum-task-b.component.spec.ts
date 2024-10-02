import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumTaskBComponent } from './sum-task-b.component';

describe('SumTaskBComponent', () => {
  let component: SumTaskBComponent;
  let fixture: ComponentFixture<SumTaskBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SumTaskBComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SumTaskBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
