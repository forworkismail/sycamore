import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from './table.state';
import { tableFeature } from './table.reducer';
import { tablePageActions } from './table.actions';

@Injectable({ providedIn: 'root' })
export class TableFacade {
  private readonly store: Store = inject(Store);

  allProducts$: Observable<Product[]> = this.store.select(tableFeature.selectAll);
  // selectedCourseId$: Observable<number | null> = this.store.select(courseFeature.selectSelectedCourseId);

  loadProducts(): void {
    this.store.dispatch(tablePageActions.loadTable());
  }

  // selectCourse(courseId: number): void {
  //   this.store.dispatch(CourseActions.selectCourse({ courseId }));
  // }
}
