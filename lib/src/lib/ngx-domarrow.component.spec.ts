import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDomarrowComponent } from './ngx-domarrow.component';

describe('NgxDomarrowComponent', () => {
  let component: NgxDomarrowComponent;
  let fixture: ComponentFixture<NgxDomarrowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxDomarrowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxDomarrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
