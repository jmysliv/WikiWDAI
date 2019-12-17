import { CourseFilter } from './../search-pipe.pipe';
import { FilterService } from './../filter.service';
import { Component, OnInit } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';

@Component({
  selector: 'app-filter-course',
  templateUrl: './filter-course.component.html',
  styleUrls: ['./filter-course.component.css']
})
export class FilterCourseComponent implements OnInit {

  name = '';
  minects = 0;
  maxects = 15;
  semester = 0;
  minrate = 0;
  maxrate = 5;
  nameCheck = false;
  semesterCheck = false;
  ectsOptions: Options = {
    floor: 0,
    ceil: 15,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min ECTS:</b> ' + value;
        case LabelType.High:
          return '<b>Max ECTS:</b> ' + value;
        default:
          return 'ECTS' + value;
      }
    }
  };
  rateOptions: Options = {
    floor: 0,
    ceil: 5,
    step: 0.1,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min rate:</b> ' + value;
        case LabelType.High:
          return '<b>Max rate:</b> ' + value;
        default:
          return 'Rate' + value;
      }
    }
  };
  semesterOptions: Options = {
    floor: 0,
    ceil: 10,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Semestr:</b> ' + value;
        default:
          return 'Semestr' + value;
      }
    }
  };
  constructor(private filterService: FilterService) { }

  sendFilter(filter): void {
    // send message to subscribers via observable subject
    this.filterService.sendFilter(filter);
}

clearMessages(): void {
  // clear messages
  this.name = '';
  this.minects = 0;
  this.maxects = 15;
  this.semester = 0;
  this.minrate = 0;
  this.maxrate = 5;
  this.nameCheck = false;
  this.semesterCheck = false;
  this.filterService.clearFilter();
}

  ngOnInit() {
  }

  filter() {
    if ( this.name !== '') {this.nameCheck = true; }
    if (this.semester !== 0) {this.semesterCheck = true; }
    const filter: CourseFilter = {
      name: {active: this.nameCheck, value: this.name},
      ects: { active: true, minvalue: this.minects, maxvalue: this.maxects},
      semester: {active: this.semesterCheck, value: this.semester},
      rating: { active: true, minvalue: this.minrate, maxvalue: this.maxrate}
    };
    this.sendFilter(filter);
  }

}
