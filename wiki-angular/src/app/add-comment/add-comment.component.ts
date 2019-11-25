import { MockDataServiceService } from './../mock-data-service.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { CourseTeacher, Section } from './../teacher';
import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../course';

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

  currentRate: 1 | 2 | 3 | 4 | 5 = 2;
  textValue = 'Napisz Komentarz';
  constructor(config: NgbRatingConfig, private mockData: MockDataServiceService) {
    config.max = 5;
   }

  ngOnInit() {
  }

  addComment() {
    this.showMe = false;
  }
}
