import { CourseFilter } from './../search-pipe.pipe';
import { FilterService } from './../filter.service';
import { MockDataServiceService } from './../mock-data-service.service';
import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  courses: Array<Course>;
  courseFilter: CourseFilter = null;
  subscription: Subscription;
  constructor(private mockData: MockDataServiceService, private filterService: FilterService) {
    this.subscription = this.filterService.getFilter().subscribe(message => {
      if (message) {
        this.courseFilter = message;
      } else {
        this.courseFilter = null;
      }
    });
  }

  ngOnInit() {
      this.mockData.getCourses().subscribe(res => {
      this.courses = res;
    });
  }

  removeCourse(course: Course) {
    this.mockData.deleteCourse(course).subscribe(res => {});
  }

}
