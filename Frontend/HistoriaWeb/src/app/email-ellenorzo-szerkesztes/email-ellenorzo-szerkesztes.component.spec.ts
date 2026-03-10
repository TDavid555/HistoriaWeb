import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailEllenorzoSzerkesztesComponent } from './email-ellenorzo-szerkesztes.component';

describe('EmailEllenorzoSzerkesztesComponent', () => {
  let component: EmailEllenorzoSzerkesztesComponent;
  let fixture: ComponentFixture<EmailEllenorzoSzerkesztesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailEllenorzoSzerkesztesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailEllenorzoSzerkesztesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
