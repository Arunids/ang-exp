import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTablePlainComponent } from './data-table-plain.component';

describe('DataTablePlainComponent', () => {
  let component: DataTablePlainComponent;
  let fixture: ComponentFixture<DataTablePlainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTablePlainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTablePlainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
