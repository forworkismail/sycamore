import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../tables/data-access/store/table.state';
import { Observable } from 'rxjs';
import { CourseFacade } from '../tables/data-access/store/table.facade';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses.component.html',
})
export default class CoursesComponent {
  private readonly courseFacade = inject(CourseFacade);
  courses$: Observable<Course[]> = this.courseFacade.allCourses$;

  ngOnInit() {
    this.courseFacade.loadCourses();
  }
}
