import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackArrowButtonComponent } from './back-arrow-button.component';

describe('BackArrowButtonComponent', () => {
  let component: BackArrowButtonComponent;
  let fixture: ComponentFixture<BackArrowButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackArrowButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackArrowButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
