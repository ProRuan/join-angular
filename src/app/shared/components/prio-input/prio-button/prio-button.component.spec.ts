import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrioButtonComponent } from './prio-button.component';

describe('PrioButtonComponent', () => {
  let component: PrioButtonComponent;
  let fixture: ComponentFixture<PrioButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrioButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrioButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
