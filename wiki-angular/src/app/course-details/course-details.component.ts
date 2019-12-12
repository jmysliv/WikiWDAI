import { Subscription } from 'rxjs';
import { UserService, UserToBeDisplayed } from './../user.service';
import { CourseTeacher, Section } from './../teacher';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockDataServiceService } from './../mock-data-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../course';
import { User } from '../user.service';


@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {


param1: string;
course: Course;
public selectValue: CourseTeacher;
public selectCategory: Section;
showVar = false;
enrollOnCourse = false;
noPlaceInCourse = false;
showCommentForm = false;
loggedUser: UserToBeDisplayed;
subscription: Subscription;
courseSubscription: Subscription;
constructor(private route: ActivatedRoute, private mockData: MockDataServiceService, private userService: UserService) {

}

  ngOnInit() {
    this.param1 = this.route.snapshot.queryParamMap.get('id');
    this.courseSubscription = this.mockData.subscribeCourseList().subscribe(res => {
      if (res) {
        res.forEach(element => {
          if (element.id === this.param1) {
            this.course = element;
          }
      });
        if (this.course.courseTeachers[0]) {
          this.selectValue = this.course.courseTeachers[0];
          if (this.course.courseTeachers[0].commentCategories[0]) {
            this.selectCategory = this.course.courseTeachers[0].commentCategories[0];
          }
        }
    } else {
        this.course = null;
      }
      this.update();
    });
    this.subscription = this.userService.isLoggedIn().subscribe(message => {
      if (message) {
        this.loggedUser = message;
      } else {
        this.loggedUser = null;
      }
      this.update();
    });
  }

  update() {
    if (this.course) {
      this.course.enrolledStudents.forEach(element => {
        if (this.loggedUser && element === this.loggedUser.id) { this.showVar = true; this.enrollOnCourse = true; }
      });
      this.course.ratings.forEach(element => {
        if (this.loggedUser && element.studentId === this.loggedUser.id) {this.showVar = false; }
      });
      this.noPlaceInCourse = false;
    }
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

  teacherOverallRating(): number {
    let sum = 0;
    let counter = 0;
    if (this.selectValue) {
      this.selectValue.commentCategories.forEach(element => {
      element.comments.forEach(x => {
        counter++;
        sum += x.rating;
      });
    });
    }
    return Math.round((sum / counter) * 10) / 10;
  }

  teacherCategoryRating(): number {
    let sum = 0;
    let counter = 0;
    if (this.selectCategory) {
       this.selectCategory.comments.forEach(element => {
        counter++;
        sum += element.rating;
      });
    }
    return Math.round((sum / counter) * 10) / 10;
  }

  changeCategory() {
    this.selectCategory = this.selectValue.commentCategories[0];
  }

  enroll() {
    if (this.course.enrolledStudents.length === this.course.maxStudents) {
      this.noPlaceInCourse = true;
      return;
    }
    this.course.enrolledStudents.push(this.loggedUser.id);
    this.mockData.patchCourse(this.course, this.course.id);
    this.showVar = true;
    this.enrollOnCourse = true;
  }

  unEnroll() {
    this.course.enrolledStudents = this.course.enrolledStudents.filter(x => x !== this.loggedUser.id);
    this.course.ratings = this.course.ratings.filter(x => x.studentId !== this.loggedUser.id);
    this.mockData.patchCourse(this.course, this.course.id);
    this.showVar = false;
    this.enrollOnCourse = false;
  }

  toggleChild2() {
    this.showCommentForm = !this.showCommentForm;
  }
}
