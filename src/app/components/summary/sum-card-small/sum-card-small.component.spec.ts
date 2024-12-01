import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumCardSmallComponent } from './sum-card-small.component';

describe('SumCardSmallComponent', () => {
  let component: SumCardSmallComponent;
  let fixture: ComponentFixture<SumCardSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SumCardSmallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SumCardSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
