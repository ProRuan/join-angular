import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactSettingsDialogComponent } from './contact-settings-dialog.component';

describe('ContactSettingsDialogComponent', () => {
  let component: ContactSettingsDialogComponent;
  let fixture: ComponentFixture<ContactSettingsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactSettingsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactSettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
