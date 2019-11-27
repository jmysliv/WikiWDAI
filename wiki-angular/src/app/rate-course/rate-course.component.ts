import { RatingValues } from './../ratings';
import { MockDataServiceService } from './../mock-data-service.service';
import { Course } from './../course';
import { Component, OnInit, Input } from '@angular/core';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';


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

  currentRate: 1 | 2 | 3 | 4 | 5 = 2;
  constructor(config: NgbRatingConfig, private mockData: MockDataServiceService) {
    config.max = 5;
  }

  ngOnInit() {
  }

  addRate() {
    const rating = {
      rating: this.currentRate,
      studentId: 'seba'
    };
    this.course.ratings.push(rating);
    this.mockData.addRating(this.course, this.course.id);
    this.showMePartially = false;
    console.log(this.course);
  }

}
