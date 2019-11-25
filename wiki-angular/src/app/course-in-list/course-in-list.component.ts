import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../course';

@Component({
  selector: 'app-course-in-list',
  templateUrl: './course-in-list.component.html',
  styleUrls: ['./course-in-list.component.css']
})
export class CourseInListComponent implements OnInit {

  @Input('kurs') course: Course;

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

  ngOnInit() {
  }


}
