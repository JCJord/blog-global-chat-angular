import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdatePostComponent } from './create-or-update-post.component';

describe('CreateOrUpdatePostComponent', () => {
  let component: CreateOrUpdatePostComponent;
  let fixture: ComponentFixture<CreateOrUpdatePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrUpdatePostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrUpdatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
