import { Course } from './../course';
import { MockDataServiceService } from './../mock-data-service.service';
import { CourseTeacher } from './../teacher';
import { Component, OnInit, Input } from '@angular/core';
import * as uuid from 'uuid';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('course') course: Course;
  // tslint:disable-next-line:no-input-rename
  @Input('courseTeacher') courseTeacher: CourseTeacher;
  // tslint:disable-next-line:no-input-rename
  @Input('Admin') Admin: boolean;
  showMe = false;
  err = false;
  good = false;

  newTeacher: CourseTeacher =  {
    teacher: {
    id: uuid.v4(),
    name: '',
    image: '',
    degree: '',
    teacherCard: {
      phone: null,
      email: '',
      homePage: ''
    },
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
};

  constructor(private mockData: MockDataServiceService) { }

  ngOnInit() {
  }

  validate(): boolean {
    if (this.newTeacher.teacher.name === '') { return false; }
    if (this.newTeacher.teacher.image === '') { return false; }
    if (this.newTeacher.teacher.degree === '') { return false; }
    if (this.newTeacher.teacher.teacherCard.email.match(/\S+@\S+\.\S+/) === null) { return false; }
    if (this.newTeacher.teacher.teacherCard.homePage.match(/https?:[\/|.|\w|\s|-]*\.*/g) === null) { return false; }
    if (this.newTeacher.teacher.teacherCard.phone === null ) { return false; }
    if (this.newTeacher.teacher.image.match(/https?:[\/|.|\w|\s|-]*\.(?:jpg|gif|png).*/g) === null) { return false; }
    return true;
  }

  checkTeacher() {
    if (this.courseTeacher.teacher.id === this.course.courseTeachers[0].teacher.id) {return true; }
    return false;
  }

  addTeacher() {
    if (this.validate()) {
      this.course.courseTeachers.push(this.newTeacher);
      this.mockData.patchCourse(this.course, this.course.id);
      this.err = false;
      this.good = true;
      setTimeout(() => {
        this.good = false;
        this.showMe = false;
      },
      1000);
    } else {
      this.err = true;
    }
  }

  teacherForm() {
    this.showMe = !this.showMe;
  }

  deleteTeacher() {
    this.course.courseTeachers = this.course.courseTeachers.filter(x => x.teacher.id !== this.courseTeacher.teacher.id);
    this.mockData.patchCourse(this.course, this.course.id);
    this.showMe = false;
  }


}
