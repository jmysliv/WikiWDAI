import { Course } from './../course';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-rate-course',
  templateUrl: './rate-course.component.html',
  styleUrls: ['./rate-course.component.css']
})
export class RateCourseComponent implements OnInit {

  @Input('kurs') course: Course;
  @Input('showMePartially') showMePartially: Boolean;
  constructor() { }

  ngOnInit() {
  }

}
