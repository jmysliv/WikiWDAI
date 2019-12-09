import { RatingValues } from './ratings';
import { Course } from './course';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MockDataServiceService {

  constructor(private httpClient: HttpClient) { }
  private REST_API_SERVER = 'http://localhost:3000';
  private currentCourses: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>(null);

  subscribeCourseList() {
    this.getCourses().subscribe(res => {
      this.currentCourses.next(res);
    });
    return this.currentCourses.asObservable();
  }

  getCourses() {
    return this.httpClient.get<Course[]>(`${this.REST_API_SERVER}/courses`);
  }

  getCourse(cName: string) {
    return this.httpClient.get<Course>(`${this.REST_API_SERVER}/courses/${cName}`);
  }

  patchCourse( itemToAdd, id: string) {
    this.httpClient.put<Course>(`${this.REST_API_SERVER}/courses/${id}`, itemToAdd).subscribe(
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

  deleteCourse(course: Course): Observable<{}> {
    const resp = this.httpClient.delete<Course>(`${this.REST_API_SERVER}/courses/${course.id}`);
    resp.subscribe(() =>
      this.getCourses().subscribe(res =>
        this.currentCourses.next(res)
    ));
    return resp;
  }

  addCourse(course: Course): Observable<{}> {
    const response =  of(this.httpClient.post<Course>(`${this.REST_API_SERVER}/courses`, course).subscribe( res => {
       console.log(res);
       this.getCourses().subscribe(resp => {
        this.currentCourses.next(resp);
        });
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      } ));
    return response;
  }
}
