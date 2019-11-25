import { MockDataServiceService } from './../mock-data-service.service';
import { Component, OnInit } from '@angular/core';
import { Course } from '../course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  courses: Array<Course>;
  constructor(private mockData: MockDataServiceService) { }

  ngOnInit() {
      this.mockData.getCourses().subscribe(res => {
      this.courses = res;
    });
  }

  removeCourse(course: Course) {
    this.mockData.deleteHero(course).subscribe(res => {});
  }

}
