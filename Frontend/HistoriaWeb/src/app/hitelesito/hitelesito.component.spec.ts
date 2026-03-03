import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HitelesitoComponent } from './hitelesito.component';

describe('HitelesitoComponent', () => {
  let component: HitelesitoComponent;
  let fixture: ComponentFixture<HitelesitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HitelesitoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HitelesitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
