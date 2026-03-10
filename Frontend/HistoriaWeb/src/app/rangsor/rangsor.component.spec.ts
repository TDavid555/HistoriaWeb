import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangsorComponent } from './rangsor.component';

describe('RangsorComponent', () => {
  let component: RangsorComponent;
  let fixture: ComponentFixture<RangsorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RangsorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RangsorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
