import { UserService, UserToBeDisplayed } from './../user.service';
import { Subscription } from 'rxjs';
import { RatingValues } from './../ratings';
import { MockDataServiceService } from './../mock-data-service.service';
import { Course } from './../course';
import { Component, OnInit, Input } from '@angular/core';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { User } from '../user.service';


@Component({
  selector: 'app-rate-course',
  templateUrl: './rate-course.component.html',
  styleUrls: ['./rate-course.component.css'],
  providers: [NgbRatingConfig]
})
export class RateCourseComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('kurs') course: Course;
  // tslint:disable-next-line:no-input-rename
  @Input('showMePartially') showMePartially: boolean;
  loggedUser: UserToBeDisplayed;
  subscription: Subscription;
  currentRate: 1 | 2 | 3 | 4 | 5 = 2;
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

  addRate() {
    const rating = {
      rating: this.currentRate,
      studentId: this.loggedUser.id
    };
    console.log(rating);
    this.course.ratings.push(rating);
    this.mockData.patchCourse(this.course, this.course.id);
    this.showMePartially = false;
  }

}
