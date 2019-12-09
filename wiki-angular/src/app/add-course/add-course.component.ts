import { ActivatedRoute } from '@angular/router';
import { MockDataServiceService } from './../mock-data-service.service';
import { Course, CourseTypes } from './../course';
import { Component, OnInit } from '@angular/core';
import * as uuid from 'uuid';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
course: Course;
courseTypes = Object.values(CourseTypes).slice(0, 4);
good = false;
err = false;
param1 = null;

  setUp() {
    this.course =  {
      id: uuid.v4(),
    name: '',
    ects: 0,
    semester: 1,
    maxStudents: null,
    courseForm: CourseTypes.Exercise,
    ratings: [],
    description: '',
    image: '',
    courseTeachers: [
      {
        teacher: {
          id: '',
          name: '',
          image: '',
          degree: '',
          teacherCard: {
            phone: null,
            email: '',
            homePage: ''
          }
        },
        commentCategories: [
          {
            category: 'wiedza',
            comments: []
          },
          {
            category: 'pasja',
            comments: []
          },
          {
            category: 'charyzma',
            comments: []
          }
        ]
    }],
    enrolledStudents: [],
  };
}



  constructor(private mockData: MockDataServiceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.setUp();
    if (this.route.snapshot.queryParamMap.get('id')) {
      this.mockData.getCourse(this.route.snapshot.queryParamMap.get('id')).subscribe(res => {
        this.course = res;
      });
    }
    this.param1 = this.route.snapshot.queryParamMap.get('id');
  }


  validate(): boolean {
    if (this.course.name === '') {return false; }
    if (this.course.maxStudents === null) {return false; }
    if (this.course.description === '') {return false; }
    if (this.course.image.match(/https?:[\/|.|\w|\s|-]*\.(?:jpg|gif|png).*/g) === null) { return false; }
    if (this.course.courseTeachers[0].teacher.name === '') { return false; }
    if (this.course.courseTeachers[0].teacher.image === '') { return false; }
    if (this.course.courseTeachers[0].teacher.degree === '') { return false; }
    if (this.course.courseTeachers[0].teacher.teacherCard.email.match(/\S+@\S+\.\S+/) === null) { return false; }
    if (this.course.courseTeachers[0].teacher.teacherCard.homePage.match(/https?:[\/|.|\w|\s|-]*\.*/g) === null) { return false; }
    if (this.course.courseTeachers[0].teacher.teacherCard.phone === null ) { return false; }
    if (this.course.courseTeachers[0].teacher.image.match(/https?:[\/|.|\w|\s|-]*\.(?:jpg|gif|png).*/g) === null) { return false; }
    return true;
  }

  addCourse() {
    if (this.validate()) {
      if (this.param1) {
        this.mockData.patchCourse(this.course, this.course.id);
      } else {
        this.mockData.addCourse(this.course).subscribe(res => {});
      }
      this.err = false;
      this.good = true;
      setTimeout(() => {
        this.good = false;
        if (this.param1 === null) { this.setUp(); }
        document.getElementById('dropdownMenuAddCourse').click();
      },
      2000);
    } else {
      this.err = true;
    }
  }


}
