import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumCardComponent } from './sum-card.component';

describe('SumCardComponent', () => {
  let component: SumCardComponent;
  let fixture: ComponentFixture<SumCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SumCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SumCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
