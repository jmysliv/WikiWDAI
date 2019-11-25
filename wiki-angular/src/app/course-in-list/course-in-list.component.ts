import { Course } from './../course';
import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';


@Component({
  selector: 'app-course-in-list',
  templateUrl: './course-in-list.component.html',
  styleUrls: ['./course-in-list.component.css']
})
export class CourseInListComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('kurs') course: Course;
  @Output() removeCourse = new EventEmitter<Course> ();
  constructor() {
  }

  courseRating(): number {
    let sum = 0;
    let counter = 0;
    this.course.ratings.forEach(element => {
      counter++;
      sum += element.rating;
    });
    return Math.round((sum / counter) * 10) / 10;
  }

  courseComments(): number {
    let sum = 0;
    this.course.courseTeachers.forEach(element => {
      element.commentCategories.forEach(x => {
        x.comments.forEach(y => {
          sum++;
        });
      });
    });
    return sum;
  }

  deleteCourse() {
    this.removeCourse.emit(this.course);
  }

  ngOnInit() {
  }


}
