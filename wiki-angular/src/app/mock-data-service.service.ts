import { UserService } from './user.service';
import { RatingValues } from './ratings';
import { Course, CourseToBeAdded } from './course';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MockDataServiceService {

  constructor(private httpClient: HttpClient, private userService: UserService) { }
  private REST_API_SERVER = 'https://studentswiki.pl:4000';
  private currentCourses: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>(null);

  subscribeCourseList() {
    this.getCourses().subscribe(res => {
      this.currentCourses.next(res);
    });
    return this.currentCourses.asObservable();
  }

  getCourses() {
    return this.httpClient.get<Course[]>(`${this.REST_API_SERVER}/courses`, { headers: this.userService.setUpHeaders()});
  }

  getCourse(cName: string) {
    return this.httpClient.get<Course>(`${this.REST_API_SERVER}/courses/${cName}`, { headers: this.userService.setUpHeaders()});
  }

  patchCourse( itemToAdd, id: string) {
    this.httpClient.put<Course>(`${this.REST_API_SERVER}/courses/${id}`, itemToAdd, { headers: this.userService.setUpHeaders()}).subscribe(
      res => {
        console.log('received ok response from patch request');
        this.getCourses().subscribe(resp => {
          this.currentCourses.next(resp);
          });
      },
      error => {
        console.error('There was an error during the request');
        console.log(error);
      });

  }

  deleteCourse(course: Course) {
    const resp = this.httpClient.delete<Course>(`${this.REST_API_SERVER}/courses/${course.id}`, {headers: this.userService.setUpHeaders()});
    resp.subscribe(() =>
      this.getCourses().subscribe(res =>
        this.currentCourses.next(res)
    ));
  }

  addCourse(course: CourseToBeAdded) {
    const response = this.httpClient.post<CourseToBeAdded>
    (`${this.REST_API_SERVER}/courses`, course, {headers: this.userService.setUpHeaders()});
    response.subscribe( res => {
        this.getCourses().subscribe(resp => {
          this.currentCourses.next(resp);
        });
      });
  }
}
