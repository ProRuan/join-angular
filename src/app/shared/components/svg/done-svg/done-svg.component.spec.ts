import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoneSvgComponent } from './done-svg.component';

describe('DoneSvgComponent', () => {
  let component: DoneSvgComponent;
  let fixture: ComponentFixture<DoneSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoneSvgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoneSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
