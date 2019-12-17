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
  courseSubscription: Subscription;
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
    this.courseSubscription = this.mockData.subscribeCourseList().subscribe(message => {
      if (message) {
        this.courses = message;
      } else {
        this.courses = null;
      }
    });
  }

  removeCourse(course: Course) {
    this.mockData.deleteCourse(course);
  }

}
