import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactViewerComponent } from './contact-viewer.component';

describe('ContactViewerComponent', () => {
  let component: ContactViewerComponent;
  let fixture: ComponentFixture<ContactViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
