import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumBTaskComponent } from './sum-b-task.component';

describe('SumBTaskComponent', () => {
  let component: SumBTaskComponent;
  let fixture: ComponentFixture<SumBTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SumBTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SumBTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
