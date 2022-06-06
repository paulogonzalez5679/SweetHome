import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbarComponent } from './probar.component';

describe('ProbarComponent', () => {
  let component: ProbarComponent;
  let fixture: ComponentFixture<ProbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
