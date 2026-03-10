import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailEllenorzoComponent } from './email-ellenorzo.component';

describe('EmailEllenorzoComponent', () => {
  let component: EmailEllenorzoComponent;
  let fixture: ComponentFixture<EmailEllenorzoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailEllenorzoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailEllenorzoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
