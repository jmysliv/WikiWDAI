import { UserService } from './../user.service';
import { Subscription } from 'rxjs';
import { MockDataServiceService } from './../mock-data-service.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { CourseTeacher, Section } from './../teacher';
import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../course';
import { UserToBeDisplayed } from '../user.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('course') course: Course;
  // tslint:disable-next-line:no-input-rename
  @Input('showMe') showMe: boolean;
  // tslint:disable-next-line:no-input-rename
  @Input('courseTeacher') courseTeacher: CourseTeacher;
  // tslint:disable-next-line:no-input-rename
  @Input('commentCategory') commentCategory: Section;

  loggedUser: UserToBeDisplayed;
  subscription: Subscription;
  currentRate: 1 | 2 | 3 | 4 | 5 = 2;
  textValue = '';
  constructor(config: NgbRatingConfig, private mockData: MockDataServiceService, private userService: UserService) {
    config.max = 5;
    this.subscription = this.userService.isLoggedIn().subscribe(message => {
      if (message) {
        this.loggedUser = message;
      } else {
        this.loggedUser = null;
      }
    });
   }

  ngOnInit() {
  }

  checkIfCommentedAlready(): boolean {
    let flag = false;
    this.commentCategory.comments.forEach(element => {
      if (element.studentId === this.loggedUser.id) { flag = true; }
    });
    return flag;
  }

  checkIfEnrolled() {
    let flag = false;
    this.course.enrolledStudents.forEach(element => {
      if (element === this.loggedUser.id) {flag = true; }
    });
    return flag;
  }

  deleteComment() {
    this.commentCategory.comments = this.commentCategory.comments.filter(x => x.studentId !== this.loggedUser.id );
    this.mockData.patchCourse(this.course, this.course.id);
    this.currentRate = 2;
    this.textValue = '';
    this.showMe = false;
  }

  addComment() {
    const comment = {
      studentId: this.loggedUser.id,
      rating: this.currentRate,
      content: this.textValue
    };
    this.commentCategory.comments.push(comment);
    this.mockData.patchCourse(this.course, this.course.id);
    this.showMe = false;
  }
}
