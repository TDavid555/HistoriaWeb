import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TortenetSzerkesztesComponent } from './tortenet-szerkesztes.component';

describe('TortenetSzerkesztesComponent', () => {
  let component: TortenetSzerkesztesComponent;
  let fixture: ComponentFixture<TortenetSzerkesztesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TortenetSzerkesztesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TortenetSzerkesztesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
