import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrioInputComponent } from './prio-input.component';

describe('PrioInputComponent', () => {
  let component: PrioInputComponent;
  let fixture: ComponentFixture<PrioInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrioInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrioInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
