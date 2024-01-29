import { ComponentFixture, TestBed } from '@angular/core/testing';

import { APIDataFetchComponent } from './api-data-fetch.component';

describe('APIDataFetchComponent', () => {
  let component: APIDataFetchComponent;
  let fixture: ComponentFixture<APIDataFetchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ APIDataFetchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(APIDataFetchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
