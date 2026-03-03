import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TortenetMegosztasComponent } from './tortenet-megosztas.component';

describe('TortenetMegosztasComponent', () => {
  let component: TortenetMegosztasComponent;
  let fixture: ComponentFixture<TortenetMegosztasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TortenetMegosztasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TortenetMegosztasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
