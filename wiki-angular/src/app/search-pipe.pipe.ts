import { CourseFilter } from './search-pipe.pipe';
import { Course } from './course';
import { Pipe, PipeTransform } from '@angular/core';



export interface CourseFilter {
  name: {active: boolean; value: string};
  ects: {active: boolean; minvalue: number; maxvalue: number};
  semester: {active: boolean; value: number};
  rating: {active: boolean; minvalue: number; maxvalue: number};
}
@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(courses: Course[], filter: CourseFilter): Course[] {
    if (!courses) {
      return [];
    }

    if (!filter) {
      return courses;
    }
    const { name, ects, semester, rating } = filter;

    if (name.active) {
      const searchText = name.value.toLowerCase();
      courses =  courses.filter(course =>
         course.name.toLowerCase().includes(searchText)
      );
  }

    if (ects.active) {
      courses =  courses.filter(course =>
           (course.ects <= ects.maxvalue && course.ects >= ects.minvalue)
      );
  }
    if (semester.active) {
      courses =  courses.filter(course =>
          (course.semester === semester.value)
      );
  }

    if (rating.active) {
      courses =  courses.filter(course => {
        let sum = 0;
        let counter = 0;
        course.ratings.forEach(element => {
          counter++;
          sum += element.rating;
        });
        let rate;
        if (sum === 0 ) {
          rate = 0;
        } else { rate =  Math.round((sum / counter) * 10) / 10; }
        return (rate <= rating.maxvalue && rate >= rating.minvalue);
      });
  }

    return courses;

  }

}
