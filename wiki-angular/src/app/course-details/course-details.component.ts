import { CourseTeacher, Section } from './../teacher';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockDataServiceService } from './../mock-data-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../course';


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
showCommentForm = false;

constructor(private route: ActivatedRoute, private mockData: MockDataServiceService) {
}

  ngOnInit() {
    this.param1 = this.route.snapshot.queryParamMap.get('id');
    this.mockData.getCourse(this.param1).subscribe(res => {
      this.course = res;
      this.selectValue = this.course.courseTeachers[0];
      this.selectCategory = this.course.courseTeachers[0].commentCategories[0];
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

  teacherOverallRating(): number {
    let sum = 0;
    let counter = 0;
    this.selectValue.commentCategories.forEach(element => {
      element.comments.forEach(x => {
        counter++;
        sum += x.rating;
      });
    });
    return Math.round((sum / counter) * 10) / 10;
  }

  teacherCategoryRating(): number {
    let sum = 0;
    let counter = 0;
    this.selectCategory.comments.forEach(element => {
        counter++;
        sum += element.rating;
    });
    return Math.round((sum / counter) * 10) / 10;
  }

  changeCategory() {
    this.selectCategory = this.selectValue.commentCategories[0];
  }

  toggleChild() {
    this.showVar = !this.showVar;
}

  toggleChild2() {
    this.showCommentForm = !this.showCommentForm;
  }
}
