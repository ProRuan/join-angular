import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumTaskAComponent } from './sum-task-a.component';

describe('SumTaskAComponent', () => {
  let component: SumTaskAComponent;
  let fixture: ComponentFixture<SumTaskAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SumTaskAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SumTaskAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
