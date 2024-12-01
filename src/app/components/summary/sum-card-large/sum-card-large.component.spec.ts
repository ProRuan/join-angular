import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumCardLargeComponent } from './sum-card-large.component';

describe('SumCardLargeComponent', () => {
  let component: SumCardLargeComponent;
  let fixture: ComponentFixture<SumCardLargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SumCardLargeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SumCardLargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
