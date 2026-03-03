import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TortenetekComponent } from './tortenetek.component';

describe('TortenetekComponent', () => {
  let component: TortenetekComponent;
  let fixture: ComponentFixture<TortenetekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TortenetekComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TortenetekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
