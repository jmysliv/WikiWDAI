import { Subscription } from 'rxjs';
import { UserService, User, UserToBeDisplayed } from './../user.service';
import { Course } from './../course';
import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';


@Component({
  selector: 'app-course-in-list',
  templateUrl: './course-in-list.component.html',
  styleUrls: ['./course-in-list.component.css']
})
export class CourseInListComponent implements OnInit {
 subscription: Subscription;
  loggedUser: UserToBeDisplayed;
  // tslint:disable-next-line:no-input-rename
  @Input('kurs') course: Course;
  @Output() removeCourse = new EventEmitter<Course> ();
  constructor(private userService: UserService) {
    this.subscription = this.userService.isLoggedIn().subscribe(message => {
      if (message) {
        this.loggedUser = message;
      } else {
        this.loggedUser = null;
      }
    });
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


  checkIfAdmin() {
    return this.userService.checkIfAdmin(this.loggedUser);
  }

  ngOnInit() {
  }


}
