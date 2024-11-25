import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginArrowComponent } from './login-arrow.component';

describe('LoginArrowComponent', () => {
  let component: LoginArrowComponent;
  let fixture: ComponentFixture<LoginArrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginArrowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
