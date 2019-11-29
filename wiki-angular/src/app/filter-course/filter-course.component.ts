import { CourseFilter } from './../search-pipe.pipe';
import { FilterService } from './../filter.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-course',
  templateUrl: './filter-course.component.html',
  styleUrls: ['./filter-course.component.css']
})
export class FilterCourseComponent implements OnInit {

  name = '';
  minects = 0;
  maxects = 0;
  semester = 1;
  minrate = 1;
  maxrate = 1;
  nameCheck = false;
  ectsCheck = false;
  semesterCheck = false;
  rateCheck = false;
  constructor(private filterService: FilterService) { }

  sendFilter(filter): void {
    // send message to subscribers via observable subject
    this.filterService.sendFilter(filter);
}

clearMessages(): void {
  // clear messages
  this.filterService.clearFilter();
}

  ngOnInit() {
  }

  filter() {
    const filter: CourseFilter = {
      name: {active: this.nameCheck, value: this.name},
      ects: { active: this.ectsCheck, minvalue: this.minects, maxvalue: this.maxects},
      semester: {active: this.semesterCheck, value: this.semester},
      rating: { active: this.rateCheck, minvalue: this.minrate, maxvalue: this.maxrate}
    };
    this.sendFilter(filter);
  }

}
