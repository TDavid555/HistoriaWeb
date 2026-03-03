import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiokSzerkesztesComponent } from './fiok-szerkesztes.component';

describe('FiokSzerkesztesComponent', () => {
  let component: FiokSzerkesztesComponent;
  let fixture: ComponentFixture<FiokSzerkesztesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiokSzerkesztesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiokSzerkesztesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
