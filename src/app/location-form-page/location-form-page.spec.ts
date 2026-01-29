import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationFormPage } from './location-form-page';

describe('LocationFormPage', () => {
  let component: LocationFormPage;
  let fixture: ComponentFixture<LocationFormPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationFormPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationFormPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
