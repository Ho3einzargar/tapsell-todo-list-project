import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropListComponent } from './drag-drop-list.component';

describe('DragDropListComponent', () => {
  let component: DragDropListComponent;
  let fixture: ComponentFixture<DragDropListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragDropListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragDropListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
