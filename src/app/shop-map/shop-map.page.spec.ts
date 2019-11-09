import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopMapPage } from './shop-map.page';

describe('ShopMapPage', () => {
  let component: ShopMapPage;
  let fixture: ComponentFixture<ShopMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopMapPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
