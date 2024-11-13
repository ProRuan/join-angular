import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperInputComponent } from './super-input.component';

describe('SuperInputComponent', () => {
  let component: SuperInputComponent;
  let fixture: ComponentFixture<SuperInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuperInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
